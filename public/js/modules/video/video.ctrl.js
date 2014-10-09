angular.module('videoApp', ['ngRoute', 'ui.router', 'slick', 'angular-loading-bar', 'ngAnimate'])
    .config(function($interpolateProvider, $locationProvider) {
        //cfpLoadingBarProvider.includeSpinner = false;
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $locationProvider.html5Mode(true);
    })
    .controller('ChannelHomeCtrl', ['$scope', '$routeParams', '$rootScope', function ($scope, $routeParams, $rootScope) {
      
    }])
    .controller('WatchVideoCtrl', ['$scope', '$location', function($scope, $location){
      
}]);