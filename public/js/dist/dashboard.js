angular.module('userModule', ['ngRoute', 'ui.router', 'UserApp'])
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('usersAll', {
            url: '/dashboard/users/all',
            templateUrl: '/templates/admin/user_all.html',
            controller: 'AdminUserAllCtrl'
          })
          .state('usersDetails', {
            url: '/dashboard/users/:userId',
            templateUrl: '/templates/admin/user_detail.html',
            resolve: {
              userPromise: ['Restangular', '$stateParams', function(Restangular, $stateParams){
                return Restangular.one('users', $stateParams.userId).get().then(function(studio){return studio});
              }]
            },
            controller: 'AdminUserDetailsCtrl'
          })
          .state('dashLogin', {
            url: '/dashboard/login',
            templateUrl: '/templates/admin/login.html',
            data: {
              login: true
            },
            controller: 'AdminLoginCtrl'
          });
  }]);
angular.module('userModule')
  .controller('AdminLoginCtrl', ['$scope', function($scope){
    $scope.user.first_name = 'Friend';
  }]);
angular.module('videoModule', ['ngRoute', 'ui.router', 'angularFileUpload', 'checklist-model'])
  .config(['$stateProvider', '$urlRouterProvider', '$routeProvider',
      function($stateProvider, $urlRouterProvider, $routeProvider) {
        $stateProvider
          // This controller is global (app.js)
          .state('videosUpload', {
            url: '/dashboard/videos/upload',
            templateUrl: '/templates/admin/video_create.html',
            data: {
              public: true
            }
          })
          .state('videosList', {
            url: '/dashboard/videos/all',
            templateUrl: '/templates/admin/video_all.html',
            controller: 'AdminVideoListCtrl',
            /*resolve: {
              videosPromise: function(){
                //return Restangular.all('videos').getList({fields: 'uid,title,slug,description,studio,created,status'}).then(function(videos){return videos});
                return 'test';
              }
            }*/
          })
          .state('videosDetails', {
            url: '/dashboard/videos/:videoId',
            templateUrl: '/templates/admin/video_detail.html',
            controller: 'AdminVideoDetailsCtrl',
            /*resolve: {
              videoPromise: function(Restangular, $stateParams){
                return Restangular.one('videos', $stateParams.videoId).get({fields: 'uid,title,description,channels,studio,status,files,thumbnails'}).then(function(video){return video});
              },
              studiosPromise: function(Restangular){
                return Restangular.all('studios').getList().then(function(studios){return studios});
              },
              channelsPromise: function(Restangular){
                return Restangular.all('channels').getList().then(function(channels){return channels});
              }
            }*/
          })
          .state('videosTrailers', {
            url: '/dashboard/trailers',
            templateUrl: '/templates/admin/video_trailers.html',
            controller: 'AdminVideoTrailersCtrl'
          });
  }]);
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
          "4": '<span class="label label-alert">Rejected</span>',
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
angular.module('videoModule')
  .controller('AdminVideoDetailsCtrl', ['$scope', '$filter', 'Restangular', '$stateParams', '$route', '$location', '$timeout',
  function ($scope, $filter, Restangular, $stateParams, $route, $location, $timeout) {
      //$scope.video = videoPromise;
      Restangular.one('videos', $stateParams.videoId).get({fields: 'uid,title,description,channels,studio,status,files,thumbnails'}).then(function(video){
        $scope.video=video;
        $scope.observer = jsonpatch.observe($scope.video);
      });
      Restangular.all('studios').getList().then(function(studios){
        $scope.studios = [];
        _.forEach(studios, function(key){
          $scope.studios.push({value: key.uid, text: key.name});
        });
        
        $scope.showStudio = function() {
          var selected = $filter('filter')($scope.studios, {value: $scope.video.studio.uid});
          return ($scope.video.studio.uid && selected.length) ? selected[0].text : 'Not set';
        };
      });
      Restangular.all('channels').getList().then(function(channels){
        $scope.channels = [];
        _.forEach(channels, function(key){
          $scope.channels.push({value: key.uid, text: key.name});
        });
        
        $scope.showChannels = function() {
          var selected = [];
          angular.forEach($scope.channels, function(s) { 
            if ($scope.video.channels.indexOf(s.value) > -1) {
              selected.push(s.text);
            }
          });
          return selected.length ? selected.join(', ') : 'Not set';
        };
      });
      $scope.statuses = [{value: '1', text: 'Approved'},
                        {value: '2', text: 'Pending'},
                        {value: '3', text: 'Processing'},
                        {value: '4', text: 'Rejected'}
                      ];

      $scope.updateVideo = function() {
        var patch = jsonpatch.generate($scope.observer);
        Restangular.one('videos', $scope.video.uid).patch(patch).then(function(){
          // video saved
        }, function(){
          // video fail!
        });
      };
      
      $scope.gogoPlayerRanger = function() {
        videojs('video-player', {
          plugins: {
            resolutions: true
          }
        }).ready(function(){
          var singlePlayer = this;
          singlePlayer.volume(0.75);
          
          function resizeVideoJS(){
            var aspectRatio = 9/16; // Make up an aspect ratio
            
            // Get the parent element's actual width
            var width = document.getElementById(singlePlayer.id()).parentElement.offsetWidth;
            // Remove the padding from the calculation
            width = width - parseInt($("#video-player").parent().css('padding-left'));
            width = width - parseInt($("#video-player").parent().css('padding-right'));
            // Set width to fill parent element, Set height
            singlePlayer.width(width).height( width * aspectRatio );
          }
        
          resizeVideoJS(); // Initialize the function
          window.onresize = resizeVideoJS; // Call the function on resize
        });
        videojs.options.flash.swf = "/js/vendor/video-js.swf";
      };
      
      $scope.showPlayer = function(){
        $timeout(function (){
          $scope.gogoPlayerRanger();
        }, 0);
      };
      $scope.showPlayer();
      $scope.$on("$destroy", function(){
          videojs('video-player').dispose();
          videojs.players = {};
      });
  }]);
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
        $scope.type[$scope.path].formData = {title: $scope.type[$scope.path].form.title, description: $scope.type[$scope.path].form.description, studio: {uid: $scope.type[$scope.path].form.studio.uid}, channels: $scope.type[$scope.path].form.channels};
      }
      // Since everything is ready, start uploading
      UploadService.save($scope.type[$scope.path]);
    };
  
  }])
  .service('UploadService', ['$upload', function($upload){
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
angular.module('videoModule')
  .controller('AdminDeleteCtrl', ['$scope', '$modal', '$location', '$state', function($scope, $modal, $location, $state){
      function deleteVideo(vidID) {
          /*Video.delete({id: vidID}).$promise.then(function(video) {
             // success
          }, function(errResponse) {
             // fail
          });*/
      }
      
      $scope.delModal = function(id, title){
          $scope.delVideo = {};
          $scope.delVideo['id'] = id;
          $scope.delVideo['title'] = title;
          $scope.open();
      };
      $scope.open = function () {
          var modalInstance = $modal.open({
            templateUrl: '/admin/views/modal.html',
            controller: ModalInstanceCtrl,
            resolve: {
                delVideo: function(){
                    return $scope.delVideo;
                }
            }
          });
          
          modalInstance.result.then(function () {
            deleteVideo($scope.delVideo['id']);
            $state.reload();
          }, function () {
            // Cancelled
          });
      };
  }]);
  
var ModalInstanceCtrl = ['$scope', '$modalInstance', 'delVideo', function ($scope, $modalInstance, delVideo) {
  $scope.videoInfo = delVideo;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}];
angular.module('videoModule')
  .controller('AdminVideoTrailersCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
      Restangular.all('trailers').getList().then(function(trailers){$scope.trailers=trailers});
      $scope.predicate = 'order';
  }]);
angular.module('studioModule', ['ngRoute', 'ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('studiosAll', {
            url: '/dashboard/studios/all',
            templateUrl: '/templates/admin/studios_all.html',
            controller: 'AdminStudioAllCtrl'
          })
          .state('studiosCreate', {
            url: '/dashboard/studios/new',
            templateUrl: '/templates/admin/studio_create.html',
            controller: 'AdminStudioCreateCtrl'
          })
          .state('studiosDetails', {
            url: '/dashboard/studios/:studioId',
            templateUrl: '/templates/admin/studio_detail.html',
            /*resolve: {
              studioPromise: function(Restangular, $stateParams){
                return Restangular.one('studios', $stateParams.studioId).get().then(function(studio){return studio});
              },
              videosPromise: function(Restangular, $stateParams){
                return Restangular.one('studios', $stateParams.studioId).getList('videos', {limit: 5, fields: 'uid,title,slug,description,created,status'}).then(function(videos){return videos});
              }
            },*/
            controller: 'AdminStudioDetailsCtrl'
          });
  }]);
angular.module('studioModule')
  .controller('AdminStudioDetailsCtrl', ['$scope', 'Restangular', '$stateParams', function ($scope, Restangular, $stateParams) {
      /*$scope.studio = studioPromise;
      $scope.videos = videosPromise;*/
      Restangular.one('studios', $stateParams.studioId).get().then(function(studio){$scope.studio=studio});
      Restangular.one('studios', $stateParams.studioId).getList('videos', {limit: 5, fields: 'uid,title,slug,description,created,status'}).then(function(videos){$scope.videos=videos});
  }]);
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
angular.module('settingsModule', ['ngRoute', 'ui.router', 'siyfion.sfTypeahead'])
  .config(['$stateProvider', '$urlRouterProvider', '$routeProvider',
      function($stateProvider, $urlRouterProvider, $routeProvider) {
        $stateProvider
          .state('settingsFeatured', {
            url: '/dashboard/settings/featured',
            templateUrl: '/templates/admin/settings_featured.html',
            controller: 'AdminSettingsFeaturedCtrl'
          });
}]);
angular.module('settingsModule')
  .controller('AdminSettingsFeaturedCtrl', ['$scope', 'WebApi', '$http', 'Restangular', function ($scope, WebApi, $http, Restangular) {
    WebApi.all('featured').get('home').then(function(featured){$scope.featured=featured});

    // Instantiate the bloodhound suggestion engine
    var trailers = new Bloodhound({
      name: 'trailers',
      datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.title); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: []
    });
  
    // initialize the bloodhound suggestion engine
    trailers.initialize();
  
    // Typeahead options object
    $scope.featuredOptions = {
      highlight: true
    };
  
    // Single dataset example
    $scope.trailers = {
      displayKey: 'title',
      source: trailers.ttAdapter()
    };
  
    Restangular.all('trailers').getList({fields: 'uid,title'}).then(function(data){
      trailers.add(data.originalElement);
    });
    
    $scope.addFeatured = function(playlist, uid){
      WebApi.all('featured').customPUT({uid: uid, playlist: playlist});
      $scope.selectedTrailer = null;
    };
}]);
angular.module('mailModule', ['ngRoute', 'ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('mailInbox', {
            url: '/dashboard/mail/inbox',
            templateUrl: '/templates/admin/mail_inbox.html',
            controller: 'AdminMailInboxCtrl'
          })
          .state('mailReply', {
            url: '/dashboard/mail/:mailId/reply',
            templateUrl: '/templates/admin/mail_reply.html',
            controller: 'AdminMailReplyCtrl'
          })
          .state('mailView', {
            url: '/dashboard/mail/:mailId',
            templateUrl: '/templates/admin/mail_view.html',
            controller: 'AdminMailViewCtrl'
          });
  }]);
angular.module('mailModule')
  .controller('AdminMailInboxCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('/contact/messages').
        success(function(data, status, headers, config) {
          $scope.messages=data;
        });
  }]);
angular.module('mailModule')
  .controller('AdminMailViewCtrl', ['$scope', function ($scope) {
      
  }]);
angular.module('mailModule')
  .controller('AdminMailReplyCtrl', ['$scope', function ($scope) {
      
  }]);
angular.module('AdminApp', ['userModule', 'videoModule', 'studioModule', 'settingsModule', 'mailModule', 'ngRoute', 'ui.bootstrap', 'ui.router', 'xeditable', 'restangular', 'angular-loading-bar', 'checklist-model', 'angularMoment', 'UserApp', 'rcWizard', 'rcForm', 'rcDisabledBootstrap'])
  .config(['$interpolateProvider', '$locationProvider', '$sceDelegateProvider', 'RestangularProvider', 'cfpLoadingBarProvider', '$stateProvider', '$urlRouterProvider', function($interpolateProvider, $locationProvider, $sceDelegateProvider, RestangularProvider, cfpLoadingBarProvider, $stateProvider, $urlRouterProvider) {
      $interpolateProvider.startSymbol('{[{');
      $interpolateProvider.endSymbol('}]}');
      $locationProvider.html5Mode(true);
      RestangularProvider.setBaseUrl('http://api.'+window.location.host);
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.includeSpinner = true;
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://slate.3digitalrockstudios.com.s3.amazonaws.com/**',
        'http://slate.3digitalrock.com/**',
        'http://slate.3digitalrockstudios.com/**'
      ]);
      // add a response intereceptor
      RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        var extractedData;
        // .. to look for getList operations
        if (operation === "getList") {
          // .. and handle the data and meta data
          extractedData = data.items;
        } else {
          extractedData = data;
        }
        return extractedData;
      });
      // Adds '.originalElement' option to return response "unrestangularized"
      RestangularProvider.setResponseExtractor(function(response) {
        var newResponse = response;
        newResponse.originalElement = angular.copy(response);
        return newResponse;
      });
      $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: '/templates/admin/home.html'
        });
      $urlRouterProvider.otherwise("/dashboard");
  }])
  .factory('WebApi', ['Restangular', '$location', function(Restangular, $location) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl($location.protocol()+$location.host());
    });
  }])
  .controller('AdminDashboardCtrl', ['$scope', function ($scope) {
    if(!$scope.user.first_name){
      $scope.user.first_name = 'Friend';
    }
  }])
  .run(['editableOptions', 'user', function(editableOptions, user){
    user.init({
      appId: '542b63aff0d72',
      heartbeatInterval: 0
    });
    editableOptions.theme = 'default';
  }]);