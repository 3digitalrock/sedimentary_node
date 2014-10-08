angular.module('videoModule')
  .controller('AdminVideoListCtrl', ['$scope', 'Restangular', 'videosPromise', function ($scope, Restangular, videosPromise) {
      $scope.videos = videosPromise;
  }])
  .directive('vidstatus', function () {
      var labelMap = {
          "1": '<span class="label label-warning">Pending</span>',
          "2": '<span class="label label-success">Approved</span>',
          "3": '<span class="label">Processing</span>',
          "4": '<span class="label label-alert">Rejected</span>',
          "0": '<span class="label label-default">Unknown</span>'
      };
      
      return {
          restrict: 'E',
          replace: true,
          /*compile: function(element, attrs) {
            var labelTpl = labelMap[attrs.code];
            //console.log(attrs.tcode);
            element.html(labelTpl);
      
            return function (scope, element, attrs) {
              element.html($compile(element.html())(scope));
            };
          },*/
          link: function (scope, elem, attrs) {
            attrs.$observe("code", function(v){
              elem.html(labelMap[v]);
            });
          }
      };
  });