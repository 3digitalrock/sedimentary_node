var apiClient = require('./api_client'),
    async = require('async'),
    reqwest = require('reqwest');

module.exports.channelRouter = function(req, res) {
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
                // TODO: Add recent videos as a subresource to channels, like studios
                async.each(channelsCount,
                    function(item, callback){
                        reqwest({
                            url: 'http://api.3drs.synth3tk.com/channels/'+item+'/videos?limit=10&fields=uid,title,slug,thumbnails',
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
            res.render('channels', {atChannel: true, pageTitle: 'Channels', channels: channelsList, layout: 'channels'});
        });
    }
};

module.exports.videoPage = function(req, res, html) {
    var relatedChannel;
        /*async.waterfall([ // Asynchronous API calls. I'm sure this could be cleaned up a bit.
            function(callback){
                apiClient.getChannels(function(results){
                    console.log(results);
                    callback(null, relatedChannel);
                });
            },
            function(relatedChannel, callback){
                console.log(relatedChannel);
                callback(null, relatedChannel);
            }
        ],
        function(err, relatedChannel){
            console.log(relatedChannel);
        });*/
console.log('basssssse');
    apiClient.getVideo(req.params.video, function(status, results){
                /*apiClient.getChannels(function(results){
                    console.log('done');
                    console.log(results);
                    //callback(null, relatedChannel);
                });*/
        if(status!==200){
            res.status(status);
            res.render('error', {
                message: "Video not found!",
                error: {},
                pageTitle: "Uh-oh! We've got a "+res.statusCode+" error!",
            });
        } else {
            if(results.youtube){
                if(!html){
                    res.render('video-yt', {atVideo:true, video: results, relatedVidsChannel: relatedChannel, layout: 'channels', pageTitle: results.title, youtube: true });
                } else {
                    res.render('video-yt', {atVideo:true, video: results, relatedVidsChannel: relatedChannel, ajax: true, layout: false});
                }
            } else {
                if(!html){
                    res.render('video-h5', {atVideo:true, video: results, relatedVidsChannel: relatedChannel, layout: 'channels', pageTitle: results.title });
                } else {
                    res.render('video-h5', {atVideo:true, video: results, relatedVidsChannel: relatedChannel, ajax: true, layout: false});
                }
            }
        }
    });
};