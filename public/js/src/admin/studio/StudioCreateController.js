angular.module('studioModule')
  .controller('AdminStudioCreateCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
    
    $scope.createStudio = function() {
      $scope.submitted = true;
      Restangular.all('studios').post({name: $scope.studio_name, description: $scope.studio_description}).then(function(studio){
        
      }, function(response) {
        $scope.submitted = false;
        console.log("Error: Status code", response.status);
        console.log(response.data);
      });
    };
  }]);