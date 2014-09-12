var express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    busboy = require('connect-busboy'),
    awsUpload = require('./lib/upload'),
    transcode = require('./lib/transcode'),
    channel = require('./lib/channel');

var app = express();

// disable detection of node and friends
app.disable('x-powered-by');

// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: 'public/views/partials/',
    layoutsDir: 'public/layouts/',
});

// Use Handlebars as default express template engine
app.engine('handlebars', hbs.engine);

// only for dev
app.disable('view cache');

// Use custom views/static directories
app.set('views', __dirname + '/public/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.set('view engine', 'handlebars');

app.use(busboy());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routing magic
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

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3002, function () {
    console.info(' ✈ HTTPServer listening at http://localhst:3002');
});