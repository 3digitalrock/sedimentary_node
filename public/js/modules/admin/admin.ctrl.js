angular.module('AdminApp', ['ngRoute', 'ui.bootstrap', 'ui.router', 'xeditable', 'restangular'])
    .config(function($interpolateProvider, $locationProvider, $sceDelegateProvider, RestangularProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $locationProvider.html5Mode(true);
        RestangularProvider.setBaseUrl('http://api.3drs.synth3tk.com');
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
            .state('videosUpload', {
              url: '/dashboard/videos/upload',
              templateUrl: '/admin/views/video_create.html',
              controller: 'AdminVideoCreateCtrl'
            })
            .state('videosDetails', {
              url: '/dashboard/videos/:videoId',
              templateUrl: '/admin/views/video_detail.html',
              controller: 'AdminVideoDetailsCtrl'
            })
            .state('studiosDetails', {
              url: '/dashboard/studio/:studioId',
              templateUrl: '/admin/views/studio_detail.html',
              controller: 'AdminStudioDetailsCtrl'
            });
          $urlRouterProvider.otherwise("/dashboard");
    }])
    .controller('AdminDashboardCtrl', ['$scope', '$stateParams', 'Restangular', function ($scope, $stateParams, Restangular) {
        var baseVideos = Restangular.all('videos');
        baseVideos.getList().then(function(videos){
          $scope.videos = videos;
        });
    }])
    .controller('AdminVideoDetailsCtrl', ['$scope', '$stateParams', '$filter', 'Restangular', function ($scope, $stateParams, $filter, Restangular) {
        var baseVideo = Restangular.one('videos', $stateParams.videoId);
        $scope.video = baseVideo.get().$object;
        observer = jsonpatch.observe($scope.video);
        
        $scope.studios = [
          {value: 'Blb5I6AEAtuj', text: '3 Digital Rock'},
          {value: 'Blb5I6AEAtuj2', text: '2 Analog Stones'}
        ]; 
      
        $scope.showStudio = function() {
          var selected = $filter('filter')($scope.studios, {value: $scope.video.studio});
          return ($scope.video.studio && selected.length) ? selected[0].text : 'Not set';
        };
        
        $scope.updateVideo = function() {
          angular.copy($scope.video, $scope.videoCopy);
          var patch = jsonpatch.generate(observer);
          baseVideo.patch(patch).then(function(){
            console.log('Okie Dokie');
          }, function(){
            console.log('Uh-oh spaghetti-o!');
          });
        };
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