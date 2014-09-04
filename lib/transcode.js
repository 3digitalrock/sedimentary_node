var config = require('../config/dev');
var client = require('zencoder')(config.zen.ZEN_KEY);

module.exports.createJob = function(fileAndPath, fileName){
    console.log("s3://3digitalrock"+fileAndPath);
    client.Job.create({
          "notifications": [
              {"format": "json", "url": "http://3drs.synth3tk.com/transcode_callback"},
          ],
          "input": "s3://3digitalrock"+fileAndPath,
          "outputs": [
            {
              "label": "mp4_high",
              "url": "s3://3digitalrock/videos/transcoded/"+fileName+"-high.mp4",
              "h264_profile": "high"
            },
            {
              "url": "s3://3digitalrock/videos/transcoded/"+fileName+".webm",
              "label": "webm",
              "format": "webm"
            },
            {
              "url": "s3://3digitalrock/videos/transcoded/"+fileName+".ogg",
              "label": "ogg",
              "format": "ogg"
            },
            {
              "url": "s3://3digitalrock/videos/transcoded/"+fileName+"-low.mp4",
              "label": "mp4_low",
              "size": "640x480"
            },
            {
              "thumbnails": [
                {
                  "label": "thumbnails",
                  "number": 3,
                  "base_url": "s3://3digitalrock/videos/thumbnails/",
                  "filename": fileName+"_{{number}}-large",
                  "width": 1280,
                  "height": 720,
                  "aspect_mode": "pad"
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
        var details = {};
        result.outputs.forEach(function(obj) {
            if(obj.thumbnails){
                details["thumbnails"] = [];
                for(var count = 0; count < obj.thumbnails[0].images.length; count++){
                    details["thumbnails"][count] = obj.thumbnails[0].images[count].url;
                }
                details["thumbnails"]["default"] = details["thumbnails"][0];
            } else {
                details[obj.label] = obj.url;
            }
        });
        console.log(details);
    }
};