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