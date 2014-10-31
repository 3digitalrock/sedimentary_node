angular.module('videoModule')
  .controller('AdminVideoUploadCtrl', ['$scope', '$upload', 'Restangular', '$location', '$rootScope', 'UploadService',
  function($scope, $upload, Restangular, $location, $rootScope, UploadService){
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
    
    $scope.type = {};
    $scope.path = '';
    $scope.uploads = UploadService.list();
    
    $scope.$on('$locationChangeSuccess', function(event) {
      $scope.path = $location.path().split( '/' )[2];
      if(!$scope.type[$scope.path]){
        $scope.type[$scope.path] = {
          file: [],
          progress: [],
          form: {},
          type: $scope.path
        };
      }
    });
    
    $scope.onFileSelect = function($files) {
      $scope.type[$scope.path].file = $files;
      $scope.type[$scope.path].progress = -1;
    };
  
    $scope.onFormSubmit = function(){
      $scope.type[$scope.path].id = null;
      
      $scope.type[$scope.path].progress = 0;
      
      $scope.type[$scope.path].file = $scope.type[$scope.path].file;
      if($scope.path=="trailers"){
        $scope.type[$scope.path].formData = {title: $scope.type[$scope.path].form.title, description: $scope.type[$scope.path].form.description, order: '99'};
      } else {
        $scope.type[$scope.path].formData = {title: $scope.type[$scope.path].form.title, description: $scope.type[$scope.path].form.description, /*studio: {uid: $scope.type[$scope.path].form.studio.uid},*/ channels: $scope.type[$scope.path].form.channels, contact: $scope.type[$scope.path].form.contact};
      }
      // Since everything is ready, start uploading
      UploadService.save($scope.type[$scope.path]);
    };
  
  }])
  .service('UploadService', function($upload){
    var itemId = {trailers: 1, videos: 1};
    
    var uploads = [];
    
    //save method create a new upload if not already exists
    //else update the existing object
    this.save = function (item) {
        if (item.id === null) {
            //if this is new upload, add it in uploads array
            item.id = item.type+itemId[item.type]++;
            uploads.push(item);
            upload(item);
        } else {
            //do stuff later to make this actually save an existing upload
        }
    };
    
    //simply search uploads list for given id
    //and returns the upload object if found
    this.get = function (id) {
      console.log('getting');
        for (var i in uploads) {
            if (uploads[i].id == id) {
                return uploads[i];
            }
        }
    };
     
    //iterate through uploads list and delete 
    //contact if found
    this.delete = function (id) {
      console.log('deleting');
        for (var i in uploads) {
            if (uploads[i].id == id) {
                uploads.splice(i, 1);
            }
        }
    };
    
    var upload = function (item) {
      console.log('uploading');
      $upload.upload({
          url: '/upload/'+item.type,
          method: 'POST',
          data: item.formData,
          file: item.file,
          // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
          //formDataAppender: function(formData, key, val){}
        }).progress(function(evt) {
          item.progress = parseInt(100.0 * evt.loaded / evt.total);
          //console.log(item.id+': '+item.progress);
        }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(status);
        })
        .error(function(err){
          console.log(err);
        });
      };
    
    //simply returns the uploads list
    this.list = function () {
      return uploads;
    };
  })
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