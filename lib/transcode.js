var client = require('zencoder')(process.env.ZEN_KEY);
var api_client = require('./api_client');
var jsonpatch = require('fast-json-patch');
var awsclient = require('./upload');

module.exports.createJob = function(fileAndPath, fileName){
    client.Job.create({
          "notifications": [
              {"format": "json", "url": "http://3drs.synth3tk.com/transcode_callback"},
          ],
          "pass_through": {filename: fileName, fullpath: fileAndPath},
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
    if(result.job.state==="finished"){
      api_client.getVideo({id: result.job.pass_through.filename}, function(status, item){
        var observer = jsonpatch.observe(item);
        item["files"] = {};
        item["thumbnails"] = [];
        result.outputs.forEach(function(obj) {
            if(obj.thumbnails){
                for(var count = 0; count < obj.thumbnails[0].images.length; count++){
                    item["thumbnails"][count] = obj.thumbnails[0].images[count].url;
                }
                item["thumbnails"]["default"] = item["thumbnails"][0];
            } else {
                item["files"][obj.label] = obj.url;
            }
        });
        awsclient.s3DeleteService(result.job.pass_through.fullpath);
        item["status"] = '2';
        var updates = JSON.stringify(jsonpatch.generate(observer));
        api_client.updateVideo(result.job.pass_through.filename, updates);
      });
    }
};