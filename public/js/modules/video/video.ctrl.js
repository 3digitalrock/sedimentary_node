angular.module('videoApp', ['ngRoute', 'apiClient', 'ui.bootstrap'])
    .config(function($interpolateProvider) {
        //cfpLoadingBarProvider.includeSpinner = false;
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })
    .controller('ChannelHomeCtrl', ['$scope', '$modal', '$routeParams', 'Video', function ($scope, $modal, $routeParams, Video) {
        Video.query().$promise.then(function(videos){
            $scope.videos = videos.items;
        }, function(errResponse) {
            // fail
        });
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