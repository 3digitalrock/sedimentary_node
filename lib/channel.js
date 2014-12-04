var apiClient = require('./api_client'),
    async = require('async'),
    reqwest = require('reqwest'),
    log = require('./logger.js');

module.exports.channelRouter = function(req, res) {
    var MobileDetect = require('mobile-detect');
    var isPhone = new MobileDetect(req.headers['user-agent']).mobile();
    
    // If specific channel requested, get it. Otherwise, show listing. Eventually put this in its own file.
    if(req.params.channel){
        var capitalChannel = req.params.channel;
        capitalChannel = capitalChannel.charAt(0).toUpperCase() + capitalChannel.substring(1);
        res.render('channels', {atChannel: true, pageTitle: capitalChannel + ' Channel', phone: isPhone});
    } else {
        async.waterfall([ // Asynchronous API calls. I'm sure this could be cleaned up a bit.
            function(callback){
                var channelsList = {};
                var channelsCount = [];
                apiClient.getChannels(function(err, results){
                    if(err){
                        log.error(err);
                        res.status(500);
                        res.render('error', {
                            message: err.code,
                            error: {},
                            pageTitle: "Uh-oh! We've got a "+res.statusCode+" error!",
                        });
                    } else {
                        results.items.forEach(function(item){
                                channelsList[item.uid] = {};
                                channelsList[item.uid] = {name: item.name};
                                channelsCount.push(item.uid);
                        });
                        callback(null, channelsList, channelsCount);
                    }
                });
            },
            function(channelsList, channelsCount, callback){
                // Another async setup for the videos subresource
                // TODO: Add recent videos as a subresource to channels, like studios
                async.each(channelsCount,
                    function(item, callback){
                        reqwest({
                            url: process.env.PROTOCOL+'://api.'+process.env.DOMAIN+'/channels/'+item+'/videos?limit=10&fields=uid,title,slug,thumbnails',
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
            res.render('channels', {atChannel: true, pageTitle: 'Channels', channels: channelsList, layout: 'channels', phone: isPhone});
        });
    }
};

module.exports.videoPage = function(req, res, html) {
    // get related videos first...
    apiClient.getRelatedVideos(req.params.video, function(relatedVideos){
        // then get the single video.
        apiClient.getVideo({id: req.params.video, query: 'fields=all'}, function(status, results){
            if(status!==200){
                res.status(status);
                res.render('error', {
                    message: "Video not found!",
                    error: {},
                    pageTitle: "Uh-oh! We've got a "+res.statusCode+" error!",
                });
            } else {
                if(results.type!==undefined){
                    if(!html){
                        res.render('video-ext', {atVideo:true, video: results, relatedVideos: relatedVideos, layout: 'channels', pageTitle: results.title, external: true });
                    }
                } else {
                    if(!html){
                        var pageUrl = process.env.PROTOCOL+'://'+process.env.DOMAIN+'/watch/'+results.uid;
                        res.render('video-h5', {atVideo:true, video: results, relatedVideos: relatedVideos, layout: 'channels', pageTitle: results.title, pageUrl: pageUrl });
                    }
                }
            }
        });
    });
};

module.exports.videoEmbed = function(req, res){
    apiClient.getVideo({id: req.params.video, query: 'fields=thumbnails,files,title,description'}, function(status, video){
        if(status!==200){
            res.status(status);
            res.render('error', {
                message: "Video not found!",
                error: {},
                pageTitle: "Uh-oh! We've got a "+res.statusCode+" error!",
            });
        } else {
            res.render('video-embed', {video: video, layout: 'embed'});
        }
    });
};