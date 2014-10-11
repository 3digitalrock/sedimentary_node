angular.module('studioModule')
  .controller('AdminStudioDetailsCtrl', ['$scope', 'Restangular', '$stateParams', function ($scope, Restangular, $stateParams) {
      /*$scope.studio = studioPromise;
      $scope.videos = videosPromise;*/
      Restangular.one('studios', $stateParams.studioId).get().then(function(studio){$scope.studio=studio});
      Restangular.one('studios', $stateParams.studioId).getList('videos', {limit: 5, fields: 'uid,title,slug,description,created,status'}).then(function(videos){$scope.videos=videos});
  }]);