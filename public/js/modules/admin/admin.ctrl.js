angular.module('AdminApp', ['ngRoute', 'ui.bootstrap', 'ui.router', 'xeditable', 'restangular', 'angular-loading-bar', 'checklist-model'])
  .config(function($interpolateProvider, $locationProvider, $sceDelegateProvider, RestangularProvider, cfpLoadingBarProvider) {
      $interpolateProvider.startSymbol('{[{');
      $interpolateProvider.endSymbol('}]}');
      $locationProvider.html5Mode(true);
      RestangularProvider.setBaseUrl('http://api.3drs.synth3tk.com');
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.includeSpinner = false;
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://3digitalrock.s3.amazonaws.com/**'
      ]);
      // add a response intereceptor
      RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        var extractedData;
        // .. to look for getList operations
        if (operation === "getList") {
          // .. and handle the data and meta data
          extractedData = data.items;
        } else {
          extractedData = data;
        }
        return extractedData;
      });
  })
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/admin/views/home.html',
            controller: 'AdminDashboardCtrl'
          })
          .state('videosAll', {
            url: '/dashboard/videos/all',
            templateUrl: '/admin/views/video_all.html',
            controller: 'AdminVideoAllCtrl'
          })
          .state('videosUpload', {
            url: '/dashboard/videos/upload',
            templateUrl: '/admin/views/video_create.html',
            controller: 'AdminVideoCreateCtrl'
          })
          .state('videosDetails', {
            url: '/dashboard/videos/:videoId',
            templateUrl: '/admin/views/video_detail.html',
            resolve: {
              videoPromise: function(Restangular, $stateParams){
                return Restangular.one('videos', $stateParams.videoId).get().then(function(video){return video});
              }
            },
            controller: 'AdminVideoDetailsCtrl'
          })
          .state('studiosCreate', {
            url: '/dashboard/studios/new',
            templateUrl: '/admin/views/studio_create.html',
            controller: 'AdminStudioCreateCtrl'
          })
          .state('studiosDetails', {
            url: '/dashboard/studios/:studioId',
            templateUrl: '/admin/views/studio_detail.html',
            resolve: {
              studioPromise: function(Restangular, $stateParams){
                return Restangular.one('studios', $stateParams.studioId).get().then(function(studio){return studio});
              }
            },
            controller: 'AdminStudioDetailsCtrl'
          });
        $urlRouterProvider.otherwise("/dashboard");
  }])
  .controller('AdminDashboardCtrl', ['$scope', function ($scope) {
    
  }])
  .controller('AdminVideoAllCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
      var baseVideos = Restangular.all('videos');
      baseVideos.getList({limit: 5}).then(function(videos){
        $scope.videos = videos;
      });
  }])
  .controller('AdminVideoDetailsCtrl', ['$scope', '$stateParams', '$filter', 'Restangular', '$route', '$location', '$routeParams', '$timeout', 'videoPromise',
  function ($scope, $stateParams, $filter, Restangular, $route, $location, $routeParams, $timeout, videoPromise) {
      $scope.video = videoPromise;
      var observer = jsonpatch.observe($scope.video);
      
      $scope.studios = [
        {value: 'Blb5I6AEAtuj', text: '3 Digital Rock'},
        {value: 'Blb5I6AEAtuj2', text: '2 Analog Stones'}
      ];
      
      $scope.channels = [
        {value: "action", text: 'Action'},
        {value: "comedy", text: 'Comedy'},
        {value: "horror", text: 'Horror'}
      ];
    
      $scope.showStudio = function() {
        var selected = $filter('filter')($scope.studios, {value: $scope.video.studio});
        return ($scope.video.studio && selected.length) ? selected[0].text : 'Not set';
      };
      
      $scope.showChannels = function() {
        var selected = [];
        angular.forEach($scope.channels, function(s) { 
          if ($scope.video.channels.indexOf(s.value) > -1) {
            selected.push(s.text);
          }
        });
        return selected.length ? selected.join(', ') : 'Not set';
      };
      
      $scope.updateVideo = function() {
        var patch = jsonpatch.generate(observer);
        Restangular.one('videos', $scope.video.uid).patch(patch).then(function(){
          console.log('video saved!');
        }, function(){
          console.log('error saving video!');
        });
      };
      
      $scope.gogoPlayerRanger = function() {
        videojs('video-player', {
          plugins: {
            resolutions: true
          }
        }).ready(function(){
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
  }])
  .controller('AdminVideoCreateCtrl', function () {
      
  })
  .controller('AdminDeleteCtrl', ['$scope', '$modal', '$location', function($scope, $modal, $location){
      function deleteVideo(vidID) {
          /*Video.delete({id: vidID}).$promise.then(function(video) {
             // success
          }, function(errResponse) {
             // fail
          });*/
      }
      
      $scope.delModal = function(id, title){
          $scope.delVideo = {};
          $scope.delVideo['id'] = id;
          $scope.delVideo['title'] = title;
          $scope.open();
      };
      $scope.open = function () {
          var modalInstance = $modal.open({
            templateUrl: '/admin/views/modal.html',
            controller: ModalInstanceCtrl,
            resolve: {
                delVideo: function(){
                    return $scope.delVideo;
                }
            }
          });
          
          modalInstance.result.then(function () {
            deleteVideo($scope.delVideo['id']);
            $location.url('/dashboard');
          }, function () {
            // Cancelled
          });
      };
  }])
  .controller('AdminStudioCreateCtrl', function () {
      
  })
  .controller('AdminStudioDetailsCtrl', function () {
      
  })
  .run(function(editableOptions){
    editableOptions.theme = 'default';
  });
    
var ModalInstanceCtrl = function ($scope, $modalInstance, delVideo) {
  $scope.videoInfo = delVideo;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

Array.prototype.contains = function(k) {
  for(var i=0; i < this.length; i++){
    if(this[i] === k){
      return true;
    }
  }
  return false;
};