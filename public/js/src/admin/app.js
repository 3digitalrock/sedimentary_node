angular.module('AdminApp', ['userModule', 'videoModule', 'studioModule', 'ngRoute', 'ui.bootstrap', 'ui.router', 'xeditable', 'restangular', 'angular-loading-bar', 'checklist-model', 'angularMoment'])
  .config(function($interpolateProvider, $locationProvider, $sceDelegateProvider, RestangularProvider, cfpLoadingBarProvider, $stateProvider, $urlRouterProvider) {
      $interpolateProvider.startSymbol('{[{');
      $interpolateProvider.endSymbol('}]}');
      $locationProvider.html5Mode(true);
      RestangularProvider.setBaseUrl('http://api.3drs.synth3tk.com');
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.includeSpinner = false;
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://slate.3digitalrockstudios.com.s3.amazonaws.com/**'
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
      $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: '/admin/views/home.html',
          controller: 'AdminDashboardCtrl'
        });
      $urlRouterProvider.otherwise("/dashboard");
  })
  .controller('AdminDashboardCtrl', ['$scope', function ($scope) {
    
  }])
  .run(function($rootScope, editableOptions){
    /*user.init({
      appId: '542b63aff0d72',
      heartbeatInterval: 0
    });*/
    editableOptions.theme = 'default';
  });