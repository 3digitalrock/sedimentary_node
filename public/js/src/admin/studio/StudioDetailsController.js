angular.module('studioModule')
  .controller('AdminStudioDetailsCtrl', ['$scope','studioPromise', 'videosPromise', function ($scope, studioPromise, videosPromise) {
      $scope.studio = studioPromise;
      $scope.videos = videosPromise;
  }]);