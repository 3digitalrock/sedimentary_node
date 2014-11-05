angular.module('videoModule')
  .controller('AdminVideoUploadCtrl', ['$scope', '$upload', 'Restangular', '$location', '$rootScope', 'UploadService', '$http',
  function($scope, $upload, Restangular, $location, $rootScope, UploadService, $http){
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
    //$scope.uploads = UploadService.list();
    
    $scope.$on('$locationChangeSuccess', function(event) {
      $scope.path = $location.path().split( '/' )[2];
      $scope.type[$scope.path] = [];
      if(!$scope.type[$scope.path][0]){
        $scope.type[$scope.path][0] = {
          file: [],
          progress: [],
          form: {},
          type: $scope.path
        };
      }
    });
  
    $scope.submitVideoInfo = function(){
      $scope.type[$scope.path][0].id = null;
      
      $scope.type[$scope.path][0].progress = 0;
      
      if($scope.path=="trailers"){
        $scope.type[$scope.path][0].formData = {title: $scope.type[$scope.path].form.title, description: $scope.type[$scope.path].form.description, order: '99'};
        Restangular.all('trailers').post($scope.type[$scope.path][0].formData).then(function(newTrailer){
          $scope.type[$scope.path][0].uid = newTrailer.uid;
          return;
        });
      } else {
        $scope.type[$scope.path][0].formData = {title: $scope.type[$scope.path].form.title, description: $scope.type[$scope.path].form.description, /*studio: {uid: $scope.type[$scope.path].form.studio.uid},*/ channels: $scope.type[$scope.path].form.channels, contact: $scope.type[$scope.path].form.contact};
        delete $scope.type[$scope.path][0].formData['contact'];
        var videoBase = Restangular.all('videos').post($scope.type[$scope.path][0].formData);
        
        return videoBase.then(function(newVideo){
          $scope.type[$scope.path][0].uid = newVideo.uid;
        });
      }
      // Since everything is ready, start uploading
      //UploadService.save($scope.type[$scope.path]);
    };
    
    $scope.onFileSelect = function($files) {
      $scope.type[$scope.path][0].file = $files;
      $scope.type[$scope.path][0].progress = -1;
      
      $http({
          url: "/s3/pgen",
          method: "POST",
          data: {size: $scope.type[$scope.path][0].file[0].size}
      }).success(function(data, status) {
          $scope.type[$scope.path][0].file[0].policy = data.policy;
          $scope.type[$scope.path][0].file[0].sig = data.sig;
      });
    };
    
    $scope.uploadVideo = function(){
      var file = $scope.type[$scope.path][0].file;
      var videoPath = 'videos/original/';
      var videoFilename = $scope.type[$scope.path][0].uid+'.'+$scope.type[$scope.path][0].file[0].type.split('/')[1];
      
      $scope.type[$scope.path][0].file[0].upload = $upload.upload({
        url: 'https://s3.amazonaws.com/slate.3digitalrockstudios.com/',
        method: 'POST',
        data : {
          key: videoPath+videoFilename,
          AWSAccessKeyId: 'AKIAJ4TXEC7GL63G5WIQ', 
          acl: 'private',
          policy: $scope.type[$scope.path][0].file[0].policy,
          signature: $scope.type[$scope.path][0].file[0].sig,
          "Content-Type": file.type !== '' ? file.type : 'application/octet-stream',
          "Content-Length": file.size
        },
        file: file,
      }).progress(function(evt) {
          $scope.type[$scope.path][0].progress = parseInt(100.0 * evt.loaded / evt.total);
      }).success(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(status);
          $http({
              url: "/s3/process",
              method: "POST",
              data: {videoPath: '/'+videoPath+videoFilename, videoFilename: $scope.type[$scope.path][0].uid, uploadType: $scope.path}
          });
      })
      .error(function(err){
          console.log(err);
      });
    };
    
    $scope.abort = function(type,typeIndex,uploadIndex) {
      $scope.type[$scope.path][typeIndex].file[uploadIndex].upload.abort();
      $scope.type[$scope.path][typeIndex].file[uploadIndex].upload = null;
      $scope.type[$scope.path][typeIndex].progress = -1;
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
          url: '/video_uploads/'+item.type,
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