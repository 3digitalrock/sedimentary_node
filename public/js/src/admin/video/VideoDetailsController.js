angular.module('videoModule')
  .controller('AdminVideoDetailsCtrl', ['$scope', '$filter', 'Restangular', '$stateParams', '$route', '$location', '$timeout',
  function ($scope, $filter, Restangular, $stateParams, $route, $location, $timeout) {
      //$scope.video = videoPromise;
      Restangular.one('videos', $stateParams.videoId).get({fields: 'uid,title,description,channels,studio,status,files,thumbnails'}).then(function(video){
        $scope.video=video;
        $scope.observer = jsonpatch.observe($scope.video);
      });
      Restangular.all('studios').getList().then(function(studios){
        $scope.studios = [];
        _.forEach(studios, function(key){
          $scope.studios.push({value: key.uid, text: key.name});
        });
        
        $scope.showStudio = function() {
          var selected = $filter('filter')($scope.studios, {value: $scope.video.studio.uid});
          return ($scope.video.studio.uid && selected.length) ? selected[0].text : 'Not set';
        };
      });
      Restangular.all('channels').getList().then(function(channels){
        $scope.channels = [];
        _.forEach(channels, function(key){
          $scope.channels.push({value: key.uid, text: key.name});
        });
        
        $scope.showChannels = function() {
          var selected = [];
          angular.forEach($scope.channels, function(s) { 
            if ($scope.video.channels.indexOf(s.value) > -1) {
              selected.push(s.text);
            }
          });
          return selected.length ? selected.join(', ') : 'Not set';
        };
      });
      $scope.statuses = [{value: '1', text: 'Approved'},
                        {value: '2', text: 'Pending'},
                        {value: '3', text: 'Processing'},
                        {value: '4', text: 'Rejected'}
                      ];

      $scope.updateVideo = function() {
        var patch = jsonpatch.generate($scope.observer);
        Restangular.one('videos', $scope.video.uid).patch(patch).then(function(){
          // video saved
        }, function(){
          // video fail!
        });
      };
      
      $scope.gogoPlayerRanger = function() {
        videojs('video-player', {
          plugins: {
            resolutions: true
          }
        });
        videojs('video-player').ready(function(){
          var singlePlayer = this;
          singlePlayer.volume(0.75);
          
          function resizeVideoJS(){
            var aspectRatio = 9/16; // Make up an aspect ratio
            
            // Get the parent element's actual width
            var width = document.getElementById(singlePlayer.id()).parentElement.offsetWidth;
            // Remove the padding from the calculation
            width = width - parseInt($("#video-player").parent().css('padding-left'));
            width = width - parseInt($("#video-player").parent().css('padding-right'));
            // Set width to fill parent element, Set height
            singlePlayer.width(width).height( width * aspectRatio );
          }
        
          resizeVideoJS(); // Initialize the function
          window.onresize = resizeVideoJS; // Call the function on resize
        });
        videojs.options.flash.swf = "/js/vendor/video-js.swf";
      };
      
      $scope.showPlayer = function(){
        $timeout(function (){
          $scope.gogoPlayerRanger();
        }, 0);
      };
      $scope.showPlayer();
      $scope.$on("$destroy", function(){
          videojs('video-player').dispose();
          videojs.players = {};
      });
  }]);