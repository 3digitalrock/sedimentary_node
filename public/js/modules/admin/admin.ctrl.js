angular.module('AdminApp', ['ngRoute', 'apiClient', 'ui.bootstrap'])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
          $routeProvider
            .when('/dashboard', {
              templateUrl: 'views/home.html',
              controller: 'AdminDashboardCtrl'
            })
            .when('/videos/upload', {
              templateUrl: 'views/video_create.html',
              controller: 'AdminVideoCreateCtrl',
              controllerAs: 'upload'
            })
            .when('/video/:videoId', {
              templateUrl: 'views/video_detail.html',
              controller: 'AdminVideoDetailsCtrl',
              controllerAs: 'video'
            })
            .when('/studio/:studioId', {
              templateUrl: 'views/studio_detail.html',
              controller: 'AdminStudioDetailsCtrl',
              controllerAs: 'studio'
            }).
            otherwise({
              redirectTo: '/dashboard'
            });
    }])
    .controller('AdminDashboardCtrl', ['$scope', '$apiClientService', '$routeParams', function ($scope, $apiClientService, $routeParams) {
        $scope.videos;
        
        getVideos();
    
        function getVideos() {
            $apiClientService.getVideos()
                .success(function (vids) {
                    $scope.videos = vids.items;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load videos: ' + error.message;
                });
        }
    }])
    .controller('AdminVideoDetailsCtrl', ['$scope', '$apiClientService', '$routeParams', function ($scope, $apiClientService, $routeParams) {
        $scope.video;
        
        getVideo($routeParams.videoId);
        
        function getVideo(vidID) {
            $apiClientService.getVideo(vidID)
                .success(function (vid) {
                    $scope.video = vid;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load video: ' + error.message;
                });
        }
    }])
    .controller('AdminVideoCreateCtrl', function () {
        
    })
    .controller('AdminDeleteCtrl', ['$scope', '$modal', '$apiClientService', '$location', function($scope, $modal, $apiClientService, $location){
        function deleteVideo(vidID) {
            $apiClientService.deleteVideo(vidID)
                .success(function () {
                    
                })
                .error(function (error) {
                    $scope.status = 'Unable to delete video: ' + error.message;
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
              templateUrl: 'views/modal.html',
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
}]);
    
var ModalInstanceCtrl = function ($scope, $modalInstance, delVideo) {
  $scope.videoInfo = delVideo;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};