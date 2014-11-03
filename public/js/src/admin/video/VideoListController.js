angular.module('videoModule')
  .controller('AdminVideoListCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
      //$scope.videos = videosPromise;
      Restangular.all('videos').getList({fields: 'uid,title,slug,description,studio,created,status'}).then(function(videos){$scope.videos=videos});
      $scope.predicate = 'upload';
  }])
  .directive('vidstatus', function () {
      var labelMap = {
          "1": '<span class="label label-success">Approved</span>',
          "2": '<span class="label label-warning">Pending</span>',
          "3": '<span class="label label-info">Processing</span>',
          "4": '<span class="label label-danger">Rejected</span>',
          "0": '<span class="label label-default">Unknown</span>'
      };
      
      return {
          restrict: 'E',
          replace: true,
          link: function (scope, elem, attrs) {
            attrs.$observe("code", function(v){
              elem.html(labelMap[v]);
            });
          }
      };
  });