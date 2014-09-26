var express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    busboy = require('connect-busboy'),
    session = require('express-session');

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

app.use(session({
    name: '3drs.sessh',
    secret: 'JAUQTovnaRMydIMObbgTvFniPWyzHiSn'
}));

// All the routes are belong to this
require('./routes/index.js')(app);

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
            error: err,
            pageTitle: "Uh-oh! We've got a "+res.statusCode+" error!"
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        pageTitle: "Uh-oh! We've got a "+res.statusCode+" error!"
    });
});

app.listen(3002, function () {
    console.info(' ✈ HTTPServer listening at http://localhst:3002');
});