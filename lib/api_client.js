var rest = require('restler');

module.exports.createVideo = function(fields) {
  rest.postJson('http://api.3drs.synth3tk.com/videos', fields).on('complete', function(data, response) {
    // handle response
  });
};

module.exports.updateVideo = function(id, fields) {
  rest.putJson('http://api.3drs.synth3tk.com/videos/'+id, fields).on('complete', function(data, response) {
    // handle response
  });
}