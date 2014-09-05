angular.module('homeApp', [])
    .config(function($interpolateProvider) {
        //cfpLoadingBarProvider.includeSpinner = false;
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })
    .controller('HomeCtrl', function ($scope) {
        $scope.videoFullscreen = false;
        $scope.fullToggle = function() {
            this.videoFullscreen = !this.videoFullscreen;
            videojs("video-bg").muted(!this.videoFullscreen);
        };
    });