var rest = require('restler');

module.exports.getVideos = function() {
  rest.get('http://api.3drs.synth3tk.com/videos').on('complete', function(data, response) {
    return data;
  });
};

module.exports.getVideo = function(options, callback) {
  rest.get('http://api.3drs.synth3tk.com/videos/'+options.id, {query: options.query}).on('complete', function(data, response) {
    callback(response.statusCode, data);
  });
};

module.exports.createVideo = function(fields) {
  rest.postJson('http://api.3drs.synth3tk.com/videos', fields).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.createTrailer = function(fields) {
  rest.postJson('http://api.3drs.synth3tk.com/trailers', fields).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.updateVideo = function(id, updates) {
  rest.patch('http://api.3drs.synth3tk.com/videos/'+id, {headers: {"Content-Type": "application/json"}, data: updates}).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.updateTrailer = function(id, updates) {
  rest.patch('http://api.3drs.synth3tk.com/trailers/'+id, {headers: {"Content-Type": "application/json"}, data: updates}).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.deleteVideo = function(id) {
  rest.del('http://api.3drs.synth3tk.com/videos/'+id).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.deleteTrailer = function(id) {
  rest.del('http://api.3drs.synth3tk.com/trailers/'+id).on('complete', function(data, response) {
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