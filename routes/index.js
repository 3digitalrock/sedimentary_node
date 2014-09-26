var awsUpload = require('../lib/upload'),
    transcode = require('../lib/transcode'),
    channel = require('../lib/channel'),
    auth = require('../lib/auth');

module.exports = function(app){
    app.get('/', function (req, res) {
        res.render('home', {showVideo: true, atHome: true, pageTitle: '3 Digital Rock Studios'});
    });
    
    app.get('/about', function (req, res) {
        res.render('about', {atAbout: true, pageTitle: 'About Our Team'});
    });
    
    app.get('/contact', function (req, res) {
        res.render('contact', {atContact: true, pageTitle: 'Contact Us', layout:false});
    });
    
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
        auth.login(req, res);
    });
    
    app.get('/register', function(req, res){
        auth.register(req, res);
    });
    
    app.get('/dashboard*', function (req, res) {
        res.render('../admin/index', {layout:false});
    });
    
    app.get('/dashboard', function (req, res) {
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