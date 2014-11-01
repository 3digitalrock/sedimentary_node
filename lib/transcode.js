var client = require('zencoder')(process.env.ZEN_KEY);
var api_client = require('./api_client');
var jsonpatch = require('fast-json-patch');
var aws = require('./aws');

module.exports.createJob = function(fileAndPath, fileName, videoType){
    // convert pass_through JSON to string to bypass ZenCoder's string-only restriction
    var pass_through = JSON.stringify({filename:fileName,fullpath:fileAndPath,videotype:videoType});
    client.Job.create({
          "notifications": [
              {"format": "json", "url": "http://"+process.env.DOMAIN+"/transcode_callback"},
          ],
          "pass_through": pass_through,
          "input": "s3://"+process.env.S3_BUCKET_NAME+fileAndPath,
          "outputs": [
            {
              "label": "mp4_high",
              "url": "s3://"+process.env.S3_BUCKET_NAME+"/videos/transcoded/"+fileName+"-high.mp4",
              "h264_profile": "high",
              "public": true
            },
            {
              "url": "s3://"+process.env.S3_BUCKET_NAME+"/videos/transcoded/"+fileName+".webm",
              "label": "webm",
              "format": "webm",
              "public": true
            },
            {
              "url": "s3://"+process.env.S3_BUCKET_NAME+"/videos/transcoded/"+fileName+".ogg",
              "label": "ogg",
              "format": "ogg",
              "public": true
            },
            {
              "url": "s3://"+process.env.S3_BUCKET_NAME+"/videos/transcoded/"+fileName+"-low.mp4",
              "label": "mp4_low",
              "size": "640x480",
              "public": true
            },
            {
              "public": true,
              "thumbnails": [
                {
                  "label": "thumbnails_large",
                  "number": 3,
                  "base_url": "s3://"+process.env.S3_BUCKET_NAME+"/videos/thumbnails/",
                  "filename": fileName+"_{{number}}-large",
                  "width": 1280,
                  "height": 720,
                  "aspect_mode": "pad"
                },
                {
                  "label": "thumbnails_small",
                  "number": 3,
                  "base_url": "s3://"+process.env.S3_BUCKET_NAME+"/videos/thumbnails/",
                  "filename": fileName+"_{{number}}-small",
                  "width": 154,
                  "height": 170,
                  "aspect_mode": "crop"
                }
              ]
            }
          ]
    }, function callback(err, data) {
          // if err is not null, something went wrong. Print it out and return.
          if (err) { console.log(err); return; }
          // otherwise all is well. Do things with the response.
        });
};

module.exports.jobCallback = function(result){
    // convert pass_through back to JSON
    result.job.pass_through = JSON.parse(result.job.pass_through);
    
    if(result.job.state==="finished"){
      api_client.getVideo({id: result.job.pass_through.filename}, function(status, item){
        var observer = jsonpatch.observe(item);
        item["files"] = {};
        item["thumbnails"] = [];
        // Loop through each part of the response
        result.outputs.forEach(function(obj) {
            // When we get to thumbnails, merge it to a single array.
            if(obj.thumbnails){
              obj.thumbnails.forEach(function(size){
                for(var count = 0; count < size.images.length; count++){
                    item["thumbnails"].push(size.images[count].url);
                }
                item["thumbnails"]["default"] = item["thumbnails"][0];
              });
            } else {
                // For everything else, there's MasterCard.
                item["files"][obj.label] = obj.url;
            }
        });
        
        aws.s3DeleteService([result.job.pass_through.fullpath]);
        item["status"] = '2';
        var updates = JSON.stringify(jsonpatch.generate(observer));
        
        if(result.job.pass_through.videotype==="videos"){
          api_client.updateVideo(result.job.pass_through.filename, updates);
        } if(result.job.pass_through.videotype==="trailers"){
          api_client.updateTrailer(result.job.pass_through.filename, updates);
        }
      });
    } else {
      return false;
    }
};