angular.module('videoApp', ['ngRoute', 'apiClient'])
    .config(function($interpolateProvider) {
        //cfpLoadingBarProvider.includeSpinner = false;
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })
    .controller('VideoCtrl', ['$scope', '$apiClientService', function ($scope, $apiClientService) {
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
    }]);