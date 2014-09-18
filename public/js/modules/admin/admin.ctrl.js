angular.module('AdminApp', ['ngRoute', 'apiClient', 'ui.bootstrap', 'ui.router', 'xeditable'])
    .config(function($interpolateProvider, $locationProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $locationProvider.html5Mode(true);
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
    .controller('AdminDashboardCtrl', ['$scope', '$stateParams', 'Video', function ($scope, $stateParams, Video) {
        Video.query().$promise.then(function(videos){
            $scope.videos = videos.items;
        }, function(errResponse) {
            // fail
        });
    }])
    .controller('AdminVideoDetailsCtrl', ['$scope', '$stateParams', 'Video', function ($scope, $stateParams, Video) {
        Video.get({id: $stateParams.videoId}).$promise.then(function(video) {
           // success
           $scope.video = video;
        }, function(errResponse) {
           // fail
        });
    }])
    .controller('AdminVideoCreateCtrl', function () {
        
    })
    .controller('AdminDeleteCtrl', ['$scope', '$modal', '$location', 'Video', function($scope, $modal, $location, Video){
        function deleteVideo(vidID) {
            Video.delete({id: vidID}).$promise.then(function(video) {
               // success
            }, function(errResponse) {
               // fail
            });
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