angular.module('AdminApp', ['userModule', 'videoModule', 'studioModule', 'settingsModule', 'mailModule', 'ngRoute', 'ui.bootstrap', 'ui.router', 'xeditable', 'restangular', 'angular-loading-bar', 'checklist-model', 'angularMoment', 'UserApp', 'rcWizard', 'rcForm', 'rcDisabledBootstrap'])
  .config(function($interpolateProvider, $locationProvider, $sceDelegateProvider, RestangularProvider, cfpLoadingBarProvider, $stateProvider, $urlRouterProvider) {
      $interpolateProvider.startSymbol('{[{');
      $interpolateProvider.endSymbol('}]}');
      $locationProvider.html5Mode(true);
      RestangularProvider.setBaseUrl('http://api.'+window.location.host);
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.includeSpinner = true;
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
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
  })
  .factory('WebApi', function(Restangular, $location) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://'+$location.host());
    });
  })
  .controller('AdminDashboardCtrl', ['$scope', function ($scope) {
    if(!$scope.user.first_name){
      $scope.user.first_name = 'Friend';
    }
  }])
  .run(function(editableOptions, user){
    user.init({
      appId: '542b63aff0d72',
      heartbeatInterval: 0
    });
    editableOptions.theme = 'default';
  });