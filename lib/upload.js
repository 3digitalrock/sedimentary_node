// Initialize aws client
// =====================
var config = require('../config/dev');
var Knox = require('knox');
var crypto = require('crypto');
var transcode = require('./transcode');
var api_client = require('./api_client');

// Create the knox client with your aws settings
Knox.aws = Knox.createClient({
  key: config.aws.AWS_ACCESS_KEY_ID,
  secret: config.aws.AWS_SECRET_ACCESS_KEY,
  bucket: config.aws.S3_BUCKET_NAME,
  region: config.aws.REGION
});

// S3 upload service - stream buffers to S3
// ========================================
var s3UploadService = function(req, next) {
  req.files = {};
  req.fields = {};
  req.fields["channels"] = [];
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
        api_client.createVideo(req.fields);
        transcode.createJob(pathToVideo, hashFilename);
      });
    });
  });

  req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    if(key==="submit") return;
    
    if(value===""||value===null||value===undefined){ console.log(key + ' is empty!'); return}
    
    if(key==="channels"){
      req.fields["channels"].push(value);
    } else {
      req.fields[key] = value;
    }
    
  });

  req.busboy.on('error', function(err) {
    console.error('Error while parsing the form: ', err);
    next(err);
  });

  req.busboy.on('finish', function() {
    // When everythin's done, render the view
    return next(null, '/admin/#/dashboard');
  });

  // Start the parsing
  req.pipe(req.busboy);
};

module.exports = s3UploadService;