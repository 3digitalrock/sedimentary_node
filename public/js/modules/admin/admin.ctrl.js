angular.module('AdminApp', ['ngRoute', 'apiClient', 'ui.bootstrap', 'ui.router', 'xeditable'])
    .config(function($interpolateProvider, $locationProvider, $sceDelegateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $locationProvider.html5Mode(true);
        $sceDelegateProvider.resourceUrlWhitelist([
          'self',
          'http://3digitalrock.s3.amazonaws.com/**'
        ]);
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
    .controller('AdminVideoDetailsCtrl', ['$scope', '$stateParams', 'Video', '$filter', function ($scope, $stateParams, Video, $filter) {
        Video.get({id: $stateParams.videoId}).$promise.then(function(video) {
           // success
           $scope.video = video;
        }, function(errResponse) {
           // fail
        });
        
        $scope.user = {
          studios: 'Blb5I6AEAtuj'
        }; 
      
        $scope.studios = [
          {value: 'Blb5I6AEAtuj', text: '3 Digital Rock'},
          {value: 'Blb5I6AEAtuj2', text: '2 Analog Stones'}
        ]; 
      
        $scope.showStudio = function() {
          var selected = $filter('filter')($scope.studios, {value: $scope.user.studios});
          return ($scope.user.studios && selected.length) ? selected[0].text : 'Not set';
        };
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