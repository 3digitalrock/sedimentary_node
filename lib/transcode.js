var config = require('../config/dev');
var client = require('zencoder')(config.zen.ZEN_KEY);

module.exports.createJob = function(filename, extension){
    client.Job.create({
          "notifications": [
              {"format": "json", "url": "http://3drs.synth3tk.com/transcode_callback"},
          ],
          "input": "s3://3digitalrock/videos/original/"+filename+extension,
          "outputs": [
            {
              "label": "mp4 high",
              "url": "s3://3digitalrock/videos/transcoded/"+filename+"-high.mp4",
              "h264_profile": "high"
            },
            {
              "url": "s3://3digitalrock/videos/transcoded/"+filename+".webm",
              "label": "webm",
              "format": "webm"
            },
            {
              "url": "s3://3digitalrock/videos/transcoded/"+filename+".ogg",
              "label": "ogg",
              "format": "ogg"
            },
            {
              "url": "s3://3digitalrock/videos/transcoded/"+filename+"-low.mp4",
              "label": "mp4 low",
              "size": "640x480"
            },
            {
              "thumbnails": [
                {
                  "label": "thumbnails",
                  "number": 3,
                  "base_url": "s3://3digitalrock/videos/thumbnails/",
                  "filename": "thumb-"+filename+"_{{number}}"
                }
              ]
            }
          ]
    }, function callback(err, data) {
          // if err is not null, something went wrong. Print it out and return.
          if (err) { console.log(err); return; }
          
          // otherwise all is well. Do things with the response.
          console.log(data);
        });
};

module.exports.jobCallback = function(result){
    //console.log(result.outputs[4].thumbnails[0]);
    if(result.job.state==="finished"){
        result.outputs.forEach(function(obj) {
            if(obj.thumbnails){
                obj.thumbnails[0].images.forEach(function(image){console.log(image.url)});
            } else {
                console.log(obj.url);
            }
        });
    }
};