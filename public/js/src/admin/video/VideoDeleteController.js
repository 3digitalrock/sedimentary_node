angular.module('videoModule')
  .controller('AdminDeleteCtrl', ['$scope', '$modal', '$location', '$state', '$stateParams', 'Videos', function($scope, $modal, $location, $state, $stateParams, Videos){
      function deleteVideo(vidID) {
          Videos.one(vidID).remove().then(function(){
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
          });
      }
      
      $scope.delModal = function(id, title){
          $scope.delVideo = {};
          $scope.delVideo['id'] = id;
          $scope.delVideo['title'] = title;
          $scope.open();
      };
      $scope.open = function () {
          var modalInstance = $modal.open({
            templateUrl: '/templates/admin/modal_delete.html',
            controller: ModalInstanceCtrl,
            resolve: {
                delVideo: function(){
                    return $scope.delVideo;
                }
            }
          });
          
          modalInstance.result.then(function () {
            deleteVideo($scope.delVideo['id']);
          }, function () {
            // Cancelled
          });
      };
      
      var ModalInstanceCtrl = function ($scope, $modalInstance, delVideo) {
        $scope.videoInfo = delVideo;
        $scope.ok = function () {
          $modalInstance.close();
        };
      
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      };
  }]);