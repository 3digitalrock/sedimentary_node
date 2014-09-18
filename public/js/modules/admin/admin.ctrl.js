angular.module('AdminApp', ['ngRoute', 'apiClient', 'ui.bootstrap'])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
          $locationProvider.html5Mode(true);
          $routeProvider
            .when('/dashboard', {
              templateUrl: '/admin/views/home.html',
              controller: 'AdminDashboardCtrl'
            })
            .when('/dashboard/videos/upload', {
              templateUrl: '/admin/views/video_create.html',
              controller: 'AdminVideoCreateCtrl',
              controllerAs: 'upload'
            })
            .when('/dashboard/video/:videoId', {
              templateUrl: '/admin/views/video_detail.html',
              controller: 'AdminVideoDetailsCtrl',
              controllerAs: 'video'
            })
            .when('/dashboard/studio/:studioId', {
              templateUrl: '/admin/views/studio_detail.html',
              controller: 'AdminStudioDetailsCtrl',
              controllerAs: 'studio'
            }).
            otherwise({
              redirectTo: '/dashboard'
            });
    }])
    .controller('AdminDashboardCtrl', ['$scope', '$routeParams', 'Video', function ($scope, $routeParams, Video) {
        Video.query().$promise.then(function(videos){
            $scope.videos = videos.items;
        }, function(errResponse) {
            // fail
        });
    }])
    .controller('AdminVideoDetailsCtrl', ['$scope', '$routeParams', 'Video', function ($scope, $routeParams, Video) {
        Video.get({id: $routeParams.videoId}).$promise.then(function(video) {
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