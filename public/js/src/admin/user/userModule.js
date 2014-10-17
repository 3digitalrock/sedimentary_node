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
              userPromise: function(Restangular, $stateParams){
                return Restangular.one('users', $stateParams.userId).get().then(function(studio){return studio});
              }
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