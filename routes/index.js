var awsUpload = require('../lib/upload'),
    transcode = require('../lib/transcode'),
    channel = require('../lib/channel'),
    passport = require('passport'),
    UserApp = require("userapp"),
    form = require('express-form'),
    field = form.field,
    MobileDetect = require('mobile-detect');

module.exports = function(app){
    app.get('/', function (req, res) {
        var isPhone = new MobileDetect(req.headers['user-agent']).phone();
        res.render('home', {showVideo: true, atHome: true, phone: isPhone, pageTitle: '3 Digital Rock Studios'});
    });
    
    app.get('/about', function (req, res) {
        res.render('about', {atAbout: true, pageTitle: 'About Our Team'});
    });
    
    app.get('/contact', function (req, res) {
        res.render('contact', {atContact: true, pageTitle: 'Contact Us', messages: req.flash('form')});
    });
    
    app.post('/contact',
        // Form filter and validation middleware
        form(
            field("name").trim().required().is(/^[a-zA-Z]+$/),
            field("phone").trim().required().is(/^[0-9]+$/),
            field("email").trim().isEmail()
        ),
        
        // Express request-handler now receives filtered and validated data
        function(req, res){
            if (!req.form.isValid) {
                // Handle errors
                req.flash('form', req.form.errors);
                res.redirect('/contact');
            
            } else {
                // Or, use filtered form data from the form object:
                console.log("Name:", req.form.name);
                console.log("Email:", req.form.email);
                console.log("Phone:", req.form.phone);
                req.flash('form', "Thank you for contacting us! We'll be in touch shortly.");
                res.redirect('/contact');
            }
        }
    );
    
    app.get('/channels', function (req, res) {
        channel.channelRouter(req, res);
    });
    
    app.get('/watch/:video/:title?.html', function (req, res) {
        channel.videoPage(req, res, true);
    });
    
    app.get('/watch/:video/:title?', function (req, res) {
        channel.videoPage(req, res);
    });
    
    app.get('/login', function(req, res){
        res.render('login', {atLogin: true, pageTitle: 'Login', error: req.flash('error')});
    });
    
    app.post('/login',
        passport.authenticate('userapp', {failureRedirect: '/login', failureFlash: 'Invalid username or password.' }),
        function(req, res) {
            // This is the default destination upon successful login.
            var redirectUrl = '/account';
            
            // If we have previously stored a redirectUrl, use that, 
            // otherwise, use the default.
            if (req.session.redirectUrl) {
                redirectUrl = req.session.redirectUrl;
                req.session.redirectUrl = null;
            }
            res.cookie('ua_session_token', req.user.token);
            res.redirect(redirectUrl);
        });
    
    app.get('/logout', function (req, res) {
        res.clearCookie('ua_session_token');
        req.logout();
        res.redirect('/');
    });
    
    app.get('/dashboard*', function (req, res, next) {
        res.render('../admin/index', {layout:false});
    });
    
    app.post('/upload', function(req, res){
        return awsUpload(req, function(err, url){res.redirect(url)});
    });
    
    app.post('/transcode_callback', function(req, res){
        transcode.jobCallback(req.body);
        res.status(204).end();
    });
};

// Simple route middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // set the current URL as the redirect after auth
    req.session.redirectUrl = req.url;
    return next();
}