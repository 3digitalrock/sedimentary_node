var express = require('express');
//var compression = require('compression');
var exphbs = require('express-handlebars');
var app = express();

// Use compress middleware to gzip content
//app.use(compression());

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
    res.render('home', {showVideo: true, pageTitle: '3 Digital Rock Studios'});
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/contact', function (req, res) {
    res.render('contact');
});

app.get('/channels', function (req, res) {
    res.render('channels');
});

app.get('/videos/:video', function (req, res) {
    res.render('videos');
    //if (req.params.email) {
        //User.findOne({ email: req.params.email }, function (err, docs) {
            //if (err) {
                //throw Error;
            //}
            //res.render('user', docs);
        //});
    //}
});

app.listen(3002);