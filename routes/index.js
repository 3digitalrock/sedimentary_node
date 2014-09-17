var awsUpload = require('../lib/upload'),
    transcode = require('../lib/transcode'),
    channel = require('../lib/channel');

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
    
    app.get('/channels/:channel.html', function(req, res, next){
        res.render('channels', {layout:false});
    });
    
    app.get('/channels/:channel?', function (req, res) {
        channel.channelRouter(req, res);
    });
    
    app.get('/watch/:video/:title?', function (req, res) {
        channel.videoPage(req, res);
    });
    
    app.get('/admin', function (req, res) {
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