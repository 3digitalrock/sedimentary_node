angular.module('mailModule')
  .controller('AdminMailInboxCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('/contact/messages').
        success(function(data, status, headers, config) {
          $scope.messages=data;
        });
  }]);