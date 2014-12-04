var aws = require('../lib/aws'),
    transcode = require('../lib/transcode'),
    channel = require('../lib/channel'),
    passport = require('passport'),
    UserApp = require("userapp"),
    form = require('express-form'),
    field = form.field,
    MobileDetect = require('mobile-detect'),
    db = require('../lib/rethinkdb');

var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});

// Set the configuration settings
var credentials = {
  clientID: 'officialApiClient',
  clientSecret: 'C0FFEE',
  site: 'http://api.3drs.synth3tk.com',
  authorizationPath: '/oauth2/authorization',
  tokenPath: '/oauth2/access_token',
  revocationPath: '/oauth2/revoke'
};

// Initialize the OAuth2 Library
var oauth2 = require('simple-oauth2')(credentials);

var cacheMiddleware = function(seconds) {
  return function(req, res, next) {
    res.setHeader("Cache-Control", "public, max-age=" + seconds);
    return next();
  };
};

module.exports = function(app){
    app.get('/', cacheMiddleware(60 * 60), function (req, res) {
        var isPhone = new MobileDetect(req.headers['user-agent']).phone();
        db.getFeatured('home', function(err, results){
            if(!err){
                res.render('home', {showVideo: true, atHome: true, phone: isPhone, trailers: results, pageTitle: '3 Digital Rock Studios'});
            } else {
                console.log(err);
                res.status(500).end();
            }
        });
    });
    
    app.get('/about', cacheMiddleware(24 * 60 * 60), function (req, res) {
        res.render('about', {atAbout: true, pageTitle: 'About Our Team'});
    });
    
    app.get('/account', requireAuth, function (req, res) {
        res.render('account', {pageTitle: 'My Account', username: req.session.username});
    });
    
    app.get('/contact', cacheMiddleware(24 * 60 * 60), function (req, res) {
        res.render('contact', {atContact: true, pageTitle: 'Contact Us', messages: req.flash('form')});
    });
    
    app.get('/contact/messages', function (req, res) {
        db.getContact(function(err, results){
           if(err){
               console.log(err);
               res.status(500).end();
           } else {
               res.send(results);
               //res.end(JSON.stringify(okData));
           }
        });
    });
    
    app.post('/contact',
        // Form filter and validation middleware
        form(
            field("name").trim().required().is(/^[-\sa-zA-Z]+$/),
            field("email").trim().isEmail(),
            field("subject").trim().required(),
            field("comment").trim().required()
        ),
        
        // Express request-handler now receives filtered and validated data
        function(req, res){
            if (!req.form.isValid) {
                // Handle errors
                
                if(req.query.json){
                    res.setHeader('Content-Type', 'application/json');
                    var errData = { success: false, errors: req.form.errors };
                    res.end(JSON.stringify(errData));
                } else {
                    req.flash('form', req.form.errors);
                    res.redirect('/contact');
                }
            } else {
                var message = "Thank you for contacting us! We'll be in touch shortly.";
                db.submitContact(req.form);
                
                var data = {
                  from: req.form.name+' <'+req.form.email+'>',
                  to: 'info@3digitalrockstudios.com',
                  subject: req.form.subject,
                  text: req.form.comment
                };
                
                mailgun.messages().send(data, function (error, body) {
                  if(error)console.log(error);
                });
                
                // Or, use filtered form data from the form object:
                if(req.query.json){
                    var okData = {success: true, message: message};
                    res.end(JSON.stringify(okData));
                } else {
                    req.flash('form', message);
                    res.redirect('/contact');
                }
            }
        }
    );
    
    app.get('/channels', cacheMiddleware(60 * 60), function (req, res) {
        channel.channelRouter(req, res);
    });
    
    app.get('/featured/:playlist', function(req, res, next){
        db.getFeatured(req.params.playlist, function(err, results){
            if(err){
                console.log(err);
                res.status(500).end();
            } else {
                res.send(results);
            }
        });
    });
    
    app.put('/featured', function(req, res, next){
        var playlists = Object.prototype.toString.call(req.body.playlist) == "[object Array]" ? req.body.playlist : [req.body.playlist];
        req.body.order = '99';
        db.postFeatured({uid: req.body.uid, playlists: playlists, order: req.body.order}, function(err){
            if(err){
                console.log(err);
            } else {
                res.status(204).end();
            }
        });
    });
    
    app.get('/store', cacheMiddleware(24 * 60 * 60), function(req, res){
        res.render('store', {atStore: true, pageTitle: 'Coming Soon | 3 Digital Rock Online Shop'});
    });
    
    app.get('/watch/:video.html', function (req, res) {
        channel.videoEmbed(req, res);
    });
    
    app.get('/watch/:video/:title?', cacheMiddleware(60 * 60), function (req, res) {
        channel.videoPage(req, res);
    });
    
    app.get('/auth',
        function(req, res, next){
            if(req.session.token){
                return res.redirect('/account');
            }
            return next();
        }, function(req, res){
            res.render('login', {atLogin: true, pageTitle: 'Login', error: req.flash('error')});
        }
    );
    
    app.post('/auth', function(req, res) {
        // This is the default destination upon successful login.
        var redirectUrl = '/account';
        
        // Get the access token object.
        var token;
        oauth2.password.getToken({
          username: req.body.username,
          password: req.body.password 
        }, saveToken);
        
        // Save the access token
        function saveToken(error, result) {
            if (error) {
                req.flash('error', error.error_description);
                return res.redirect('/auth');
            }
            
            token = oauth2.accessToken.create(result);
            
            // Save the session to Redis for persistence
            req.session.token = token.token.access_token;
            req.session.username = req.body.username;

            // If we have previously stored a redirectUrl, use that, 
            // otherwise, use the default.
            if (req.session.redirectUrl) {
                redirectUrl = req.session.redirectUrl;
                delete req.session.redirectUrl;
            } else {
                redirectUrl = '/account';
            }

            res.redirect(redirectUrl);
        }
    });
    
    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.redirect('/');
    });
    
    app.get('/dashboard*', function (req, res, next) {
        res.render('admin', {layout:false});
    });
    
    app.post('/video_uploads/:type', function(req, res){
        return aws.s3UploadService(req, function(err){res.end()});
    });
    
    app.post('/s3/pgen', function(req, res){
        res.send(aws.s3PolicyGenerator(req.body.size));
    });
    
    app.post('/s3/process', function(req, res){
        transcode.createJob(req.body.videoPath, req.body.videoFilename, req.body.uploadType);
        res.status(204).end();
    });
    
    app.post('/transcode_callback', function(req, res){
        transcode.jobCallback(req.body);
        res.status(204).end();
    });
};

// Simple route middleware to ensure user is authenticated
function requireAuth(req, res, next) {
    if (req.session.token) {
        return next();
    }

    res.redirect('/auth');
}