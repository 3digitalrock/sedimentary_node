angular.module('videoModule', ['ngRoute', 'ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('videosList', {
            url: '/dashboard/videos/all',
            templateUrl: '/admin/views/video_all.html',
            controller: 'AdminVideoListCtrl',
            resolve: {
              videosPromise: function(Restangular){
                return Restangular.all('videos').getList({fields: 'uid,title,slug,description,studio,created,status'}).then(function(videos){return videos});
              }
            }
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
                return Restangular.one('videos', $stateParams.videoId).get({fields: 'uid,title,description,channels,studio,status,files,thumbnails'}).then(function(video){return video});
              },
              studiosPromise: function(Restangular){
                return Restangular.all('studios').getList().then(function(studios){return studios});
              },
              channelsPromise: function(Restangular){
                return Restangular.all('channels').getList().then(function(channels){return channels});
              }
            }
          });
  }]);