angular.module('AdminApp', ['userModule', 'videoModule', 'studioModule', 'ngRoute', 'ui.bootstrap', 'ui.router', 'xeditable', 'restangular', 'angular-loading-bar', 'checklist-model', 'angularMoment'])
  .config(function($interpolateProvider, $locationProvider, $sceDelegateProvider, RestangularProvider, cfpLoadingBarProvider) {
      $interpolateProvider.startSymbol('{[{');
      $interpolateProvider.endSymbol('}]}');
      $locationProvider.html5Mode(true);
      RestangularProvider.setBaseUrl('http://api.3drs.synth3tk.com');
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.includeSpinner = false;
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://3digitalrock.s3.amazonaws.com/**'
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
  })
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/admin/views/home.html',
            controller: 'AdminDashboardCtrl'
          })
          .state('videosList', {
            url: '/dashboard/videos/all',
            templateUrl: '/admin/views/video_all.html',
            controller: 'AdminVideoListCtrl'
          })
          .state('videosUpload', {
            url: '/dashboard/videos/upload',
            templateUrl: '/admin/views/video_create.html',
            controller: 'AdminVideoUploadCtrl'
          })
          .state('videosDetails', {
            url: '/dashboard/videos/:videoId',
            templateUrl: '/admin/views/video_detail.html',
            controller: 'AdminVideoDetailsCtrl',
            resolve: {
              videoPromise: function(Restangular, $stateParams){
                return Restangular.one('videos', $stateParams.videoId).get().then(function(video){return video});
              },
              studiosPromise: function(Restangular){
                return Restangular.all('studios').getList().then(function(studios){return studios});
              },
              channelsPromise: function(Restangular){
                return Restangular.all('channels').getList().then(function(channels){return channels});
              }
            }
          })
          .state('studiosAll', {
            url: '/dashboard/studios/all',
            templateUrl: '/admin/views/studios_all.html',
            controller: 'AdminStudioAllCtrl'
          })
          .state('studiosCreate', {
            url: '/dashboard/studios/new',
            templateUrl: '/admin/views/studio_create.html',
            controller: 'AdminStudioCreateCtrl'
          })
          .state('studiosDetails', {
            url: '/dashboard/studios/:studioId',
            templateUrl: '/admin/views/studio_detail.html',
            resolve: {
              studioPromise: function(Restangular, $stateParams){
                return Restangular.one('studios', $stateParams.studioId).get().then(function(studio){return studio});
              }
            },
            controller: 'AdminStudioDetailsCtrl'
          })
          .state('usersAll', {
            url: '/dashboard/users/all',
            templateUrl: '/admin/views/user_all.html',
            controller: 'AdminUserAllCtrl'
          })
          .state('usersDetails', {
            url: '/dashboard/users/:userId',
            templateUrl: '/admin/views/user_detail.html',
            resolve: {
              userPromise: function(Restangular, $stateParams){
                return Restangular.one('users', $stateParams.userId).get().then(function(studio){return studio});
              }
            },
            controller: 'AdminUserDetailsCtrl'
          })
          .state('dashLogin', {
            url: '/dashboard/login',
            templateUrl: '/admin/views/login.html',
            data: {
              login: true
            },
            controller: 'AdminLoginCtrl'
          });
        $urlRouterProvider.otherwise("/dashboard");
  }])
  .controller('AdminDashboardCtrl', ['$scope', function ($scope) {
    
  }])
  .run(function($rootScope, editableOptions){
    /*user.init({
      appId: '542b63aff0d72',
      heartbeatInterval: 0
    });*/
    editableOptions.theme = 'default';
  });