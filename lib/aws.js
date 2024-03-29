// Initialize aws client
// =====================
var Knox = require('knox');
var crypto = require('crypto');
var transcode = require('./transcode');
var api_client = require('./api_client');
var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});
var policy = require('s3-policy');

// Create the knox client with your aws settings
Knox.aws = Knox.createClient({
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.S3_BUCKET_NAME,
  region: process.env.S3_REGION
});

// S3 upload service - stream buffers to S3
// ========================================
module.exports.s3UploadService = function(req, next) {
  req.files = {};
  req.fields = {};
  if(req.fields["channels"])req.fields["channels"] = [];
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    if (!filename) {
      // If filename is not truthy it means there's no file
      return;
    }
    // Create the initial array containing the stream's chunks
    file.fileRead = [];

    file.on('data', function(chunk) {
      // Push chunks into the fileRead array
      this.fileRead.push(chunk);
    });

    file.on('error', function(err) {
      console.log('Error while buffering the stream: ', err);
    });

    file.on('end', function() {
      // Concat the chunks into a Buffer
      var finalBuffer = Buffer.concat(this.fileRead);

      req.files[fieldname] = {
        buffer: finalBuffer,
        size: finalBuffer.length,
        filename: filename,
        mimetype: mimetype
      };
      
      // Create filename
      var hashFilename = req.fields.uid = crypto.randomBytes(Math.ceil(12/2)).toString('hex').slice(0,12);

      var fileExtension = filename.substr(filename.length - 4);

      var pathToVideo = '/videos/original/' + hashFilename + fileExtension;

      var headers = {
        'Content-Length': req.files[fieldname].size,
        'Content-Type': req.files[fieldname].mimetype
      };

      Knox.aws.putBuffer( req.files[fieldname].buffer, pathToVideo, headers, function(err, response){
        if (err) {
          console.error('error streaming file: ', new Date(), err);
          return next(err);
        }
        if (response.statusCode !== 200) {
          console.error('error streaming file: ', new Date(), err);
          return next(err);
        }
        delete req.fields['contact'];
        if(req.params.type=='videos'){
          api_client.createVideo(req.fields);
        } else if(req.params.type=='trailers') {
          api_client.createTrailer(req.fields);
        } else {
          return next({message: "Video type is invalid. Please use 'videos' or 'trailers'."});
        }
        transcode.createJob(pathToVideo, hashFilename, req.params.type);
      });
    });
  });

  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    if(key==="submit") return;
    
    if(value===""||value===null||value===undefined){ console.log(key + ' is empty!'); return}
    
    if(key==="channels"||key==="studio"){
      // turn into valid JSON
      var json_value = JSON.parse(value);
      req.fields[key] = json_value;
    } else {
      req.fields[key] = value;
    }
  });

  req.busboy.on('error', function(err) {
    console.error('Error while parsing the form: ', err);
    next(err);
  });

  // When everything's done and there's no errors
  req.busboy.on('finish', function() {
    if(req.fields["contact"]){
      var data = {
        from: '3DRS Web Guy <webmaster@3digitalrockstudios.com>',
        to: 'davidt@3digitalrockstudios.com',
        subject: 'New Video Upload!',
        text: req.fields["contact"].name+' from '+req.fields["contact"].studioName+' has uploaded a new video. To view, approve, or reject it, click here:\n <link>\n\nContact information:\n'+req.fields["contact"].email+'\n'+req.fields["contact"].phone
      };
      mailgun.messages().send(data, function (error, body) {
        if(error)console.log(error);
      });
    }
    return next(null);
  });

  // Start the parsing
  req.pipe(req.busboy);
};

module.exports.s3PolicyGenerator = function(size) {
  var p = policy({
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    length: size,
    bucket: process.env.S3_BUCKET_NAME,
    key: process.env.AWS_ACCESS_KEY_ID,
    expires: new Date(Date.now() + 60000),
    acl: 'private',
    name: 'videos/original/'
  });

  return {policy: p.policy, sig: p.signature};
};

module.exports.s3DeleteService = function(files, transcodes){
  if(transcodes===undefined){
    Knox.aws.del(files[0]).on('response', function(res){
      if(res.statusCode!==204){
        console.log(res);
      }
    }).end();
  } else {
    Knox.aws.deleteMultiple(files, function(err, res){
      if(res.statusCode!==204){
        console.log(res);
      }
    });
  }
};