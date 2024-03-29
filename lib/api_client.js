var rest = require('restler');

module.exports.getVideos = function() {
  rest.get(process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/videos').on('complete', function(data, response) {
    return data;
  });
};

module.exports.getVideo = function(options, callback) {
  rest.get(process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/videos/'+options.id, {query: options.query}).on('complete', function(data, response) {
    callback(response.statusCode, data);
  });
};

module.exports.createVideo = function(fields) {
  rest.postJson(process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/videos', fields).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.createTrailer = function(fields) {
  rest.postJson(process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/trailers', fields).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.updateVideo = function(id, updates) {
  rest.patch(process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/videos/'+id, {headers: {"Content-Type": "application/json"}, data: updates}).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.updateTrailer = function(id, updates) {
  rest.patch(process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/trailers/'+id, {headers: {"Content-Type": "application/json"}, data: updates}).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.deleteVideo = function(id) {
  rest.del(process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/videos/'+id).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.deleteTrailer = function(id) {
  rest.del(process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/trailers/'+id).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.getChannels = function(callback) {
  rest.get(process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/channels').on('complete', function(data, response){
    if(data.code){
      callback(data, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports.getChannelVideos = function(id, callback) {
  rest.get(process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/channels/'+id+'/videos').on('complete', function(data, response){
    return data;
  });
};

module.exports.getRelatedVideos = function(id, callback) {
  rest.get(process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/videos/'+id+'/related').on('complete', function(data, response){
    callback(data);
  });
};