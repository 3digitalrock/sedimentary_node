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