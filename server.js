var express = require('express');
//var compression = require('compression');
var exphbs = require('express-handlebars');
var path = require("path");
var app = express();

// Use compress middleware to gzip content
//app.use(compression());

// disable detection of node and friends
app.disable('x-powered-by');

// Use Handlebars as default express template engine
app.engine('handlebars', exphbs({
    layoutsDir: 'public/layouts/',
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// only for dev
app.disable('view cache');

// Use custom views/static directories
app.set('views', path.resolve(__dirname,'public/views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

// Routing magic
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/contact', function (req, res) {
    res.render('contact');
});

app.get('/videos', function (req, res) {
    res.render('videos');
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