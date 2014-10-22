angular.module('videoModule')
  .controller('AdminVideoTrailersCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
      Restangular.all('trailers').getList().then(function(trailers){$scope.trailers=trailers});
      $scope.predicate = 'order';
  }]);