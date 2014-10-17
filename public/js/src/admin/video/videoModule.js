angular.module('videoModule', ['ngRoute', 'ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', '$routeProvider',
      function($stateProvider, $urlRouterProvider, $routeProvider) {
        $stateProvider
          .state('videosUpload', {
            url: '/dashboard/videos/upload',
            templateUrl: '/templates/admin/video_create.html',
            controller: 'AdminVideoUploadCtrl'
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
          });
  }]);