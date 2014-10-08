angular.module('videoModule')
  .controller('AdminVideoListCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
      var baseVideos = Restangular.all('videos');
      baseVideos.getList({limit: 5, fields: 'uid,title,slug,description,studio,created'}).then(function(videos){
        $scope.videos = videos;
      });
  }]);