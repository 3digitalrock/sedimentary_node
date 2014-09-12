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
};

module.exports.videoPage = function(req, res) {
    apiClient.getVideo(req.params.video, function(status, results){
        if(status!==200){
            res.status(status);
            res.render('error', {
                message: "Video not found!",
                error: {},
                pageTitle: "Uh-oh! We've got a "+res.statusCode+" error!",
            });
        } else {
            res.render('video', {atChannel:true, pageTitle: results.title, video: results});
        }
    });
};