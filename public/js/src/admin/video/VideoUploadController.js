angular.module('videoModule')
  .controller('AdminVideoUploadCtrl', ['$scope', '$upload', 'Restangular', function($scope, $upload, Restangular){
    // Get all channels and studios for selection
    Restangular.all('channels').getList().then(function(channels){
      $scope.channellist = [];
      _.forEach(channels, function(key){
        $scope.channellist.push({uid: key.uid, name: key.name});
      });
    });
    
    Restangular.all('studios').getList().then(function(studios){
      $scope.studiolist = [];
      _.forEach(studios, function(key){
        $scope.studiolist.push({uid: key.uid, name: key.name});
      });
    });
    
    $scope.progress = [];
    $scope.form = {};
    
    $scope.onFileSelect = function($files) {
      $scope.selectedFiles = $files;
      for (var i = 0; i < $scope.selectedFiles.length; i++) {
        $scope.progress[i] = -1;
      }
    };
  
    $scope.onFormSubmit = function(){
      for (var i = 0; i < $scope.selectedFiles.length; i++) {
        $scope.iteration = i;
        
        $scope.progress[$scope.iteration] = 0;
        var file = $scope.selectedFiles[$scope.iteration];

        $scope.upload = $upload.upload({
          url: '/upload',
          method: 'POST',
          data: {title: $scope.form.title, description: $scope.form.description, studio: {uid: $scope.form.studio.uid}, channels: $scope.form.channels},
          file: file,
          // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
          //formDataAppender: function(formData, key, val){}
        }).progress(function(evt) {
          //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          $scope.progress[$scope.iteration] = parseInt(100.0 * evt.loaded / evt.total);
          //console.log($scope.progress[$scope.iteration]);
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(status);
          console.log(data);
        })
        .error(function(err){
          console.log(err);
        });
        //.then(success, error, progress); 
        // access or attach event listeners to the underlying XMLHttpRequest.
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})
      }
      /* alternative way of uploading, send the file binary with the file's content-type.
         Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
         It could also be used to monitor the progress of a normal http post/put request with large data*/
      // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
    };
  
  }])
  .directive('progressActive', function() {
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              attrs.$observe('progress', function(value) {
                if (value === '100') {
                  element.removeClass('active');
                  element.removeClass('progress-striped');
                  element.children('.progress-bar').removeClass('progress-bar-primary');
                  element.children('.progress-bar').addClass('progress-bar-success');
                }
              });
          }
      };
  });