var express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    busboy = require('connect-busboy'),
    awsUpload = require('./lib/upload'),
    transcode = require('./lib/transcode'),
    apiClient = require('./lib/api_client'),
    async = require('async'),
    reqwest = require('reqwest');
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
    // If specific channel requested, get it. Otherwise, show listing. Eventually put this in its own file.
    if(req.params.channel){
        var capitalChannel = req.params.channel;
        capitalChannel = capitalChannel.charAt(0).toUpperCase() + capitalChannel.substring(1);
        res.render('channels', {atChannel: true, pageTitle: capitalChannel + ' Channel'});
    } else {
        async.waterfall([ // Asynchronous API calls. I'm sure this could be cleaned up a bit.
            function(callback){
                var channelsList = {};
                var channelsCount = [];
                apiClient.getChannels(function(results){
                    results.items.forEach(function(item){
                            channelsList[item.uid] = {};
                            channelsList[item.uid] = {name: item.name};
                            channelsCount.push(item.uid);
                    });
                    callback(null, channelsList, channelsCount);
                });
            },
            function(channelsList, channelsCount, callback){
                // Another async setup for the videos subresource
                async.each(channelsCount,
                    function(item, callback){
                        reqwest({
                            url: 'http://api.3drs.synth3tk.com/channels/'+item+'/videos',
                        }).then(function(response){
                            channelsList[item].items = response.items;
                            callback();
                        });
                    }, function(){
                        callback(null, channelsList);
                    });
            },
            function(channelsList, callback){
                callback(null, channelsList);
            }
        ],
        function(err, channelsList){
            res.render('channels', {atChannel: true, pageTitle: 'Channels', channels: channelsList});
        });
    }
});

app.get('/videos/:video', function (req, res) {
    res.render('videos');
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

app.listen(3002, function () {
    console.info(' ✈ HTTPServer listening at http://localhst:3002');
});