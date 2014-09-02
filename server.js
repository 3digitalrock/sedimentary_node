var express = require('express');
//var compression = require('compression');
var exphbs = require('express-handlebars');
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

// Routing magic
app.get('/', function (req, res) {
    res.render('home', {showVideo: true, atHome: true, pageTitle: '3 Digital Rock Studios'});
});

app.get('/about', function (req, res) {
    res.render('about', {atAbout: true, pageTitle: 'About Our Team'});
});

app.get('/contact', function (req, res) {
    res.render('contact', {atContact: true, pageTitle: 'Contact Us'});
});

app.get('/channels', function (req, res) {
    res.render('channels', {atChannel: true, pageTitle: 'Channels'});
});

app.get('/videos/:video', function (req, res) {
    res.render('videos');
});

app.get('/admin', function (req, res) {
    res.render('admin/index', {layout: 'admin'});
});

app.listen(3002, function () {
    console.info(' ✈ HTTPServer listening at http://localhst:3001');
});