angular.module('videoApp', ['ngRoute', 'apiClient', 'ui.bootstrap', 'ui.router', 'slick', 'angular-loading-bar', 'ngAnimate'])
    .config(function($interpolateProvider, $locationProvider) {
        //cfpLoadingBarProvider.includeSpinner = false;
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $locationProvider.html5Mode(true);
    })
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          $stateProvider
            .state('channels', {
              url: '/channels',
              controller: 'ChannelHomeCtrl'
            })
            .state('watch', {
              url: '/watch/:uid',
              templateUrl: function(params){
                return '/watch/'+params.uid+'.html';
              },
              controller: 'WatchVideoCtrl'
            });
    }])
    .controller('ChannelHomeCtrl', ['$scope', '$modal', '$routeParams', 'Video', '$rootScope', function ($scope, $modal, $routeParams, Video, $rootScope) {
      console.log('channel');
      
      Video.query().$promise.then(function(videos){
          $scope.videos = videos.items;
      }, function(errResponse) {
          // fail
      });
    }])
    .controller('WatchVideoCtrl', ['$scope', '$location', function($scope, $location){
      console.log('watch');
}]);
    
var VideoModalCtrl = function ($scope, $modalInstance, videoInfo) {
  $scope.video = videoInfo;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};