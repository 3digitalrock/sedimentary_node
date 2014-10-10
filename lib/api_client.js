var rest = require('restler');

module.exports.getVideos = function() {
  rest.get('http://api.3drs.synth3tk.com/videos').on('complete', function(data, response) {
    return data;
  });
};

module.exports.getVideo = function(id, fields, callback) {
  rest.get('http://api.3drs.synth3tk.com/videos/'+id, fields).on('complete', function(data, response) {
    callback(response.statusCode, data);
  });
};

module.exports.createVideo = function(fields) {
  rest.postJson('http://api.3drs.synth3tk.com/videos', fields).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.updateVideo = function(id, fields) {
  rest.putJson('http://api.3drs.synth3tk.com/videos/'+id, fields).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.deleteVideo = function(id) {
  rest.del('http://api.3drs.synth3tk.com/videos/'+id).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.getChannels = function(callback) {
  rest.get('http://api.3drs.synth3tk.com/channels').on('complete', function(data, response){
    callback(data);
  });
};

module.exports.getChannelVideos = function(id, callback) {
  rest.get('http://api.3drs.synth3tk.com/channels/'+id+'/videos').on('complete', function(data, response){
    return data;
  });
};

module.exports.getRelatedVideos = function(id, callback) {
  rest.get('http://api.3drs.synth3tk.com/videos/'+id+'/related').on('complete', function(data, response){
    callback(data);
  });
};