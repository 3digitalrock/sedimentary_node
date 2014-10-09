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
              controller: 'WatchVideoCtrl'
            });
    }])
    .controller('ChannelHomeCtrl', ['$scope', '$modal', '$routeParams', 'Video', '$rootScope', function ($scope, $modal, $routeParams, Video, $rootScope) {
      
    }])
    .controller('WatchVideoCtrl', ['$scope', '$location', function($scope, $location){
      
}]);