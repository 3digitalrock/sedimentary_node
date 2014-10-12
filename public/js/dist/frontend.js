angular.module('apiClient',['ngResource'])
  .factory('Video', ['$resource', function($resource) {
    return $resource('http://api.3drs.synth3tk.com/videos/:id', { id: '@id' }, {
      'save': {
        method: 'PUT'
      },
      'query': {
          method:'GET',
          isArray:false
      },
      'delete': {
          method:'DELETE'
      }
    });
  }])
  .factory('Channel', ['$resource', function($resource) {
    return $resource('http://api.3drs.synth3tk.com/channels/:id', { id: '@id' }, {
      'save': {
        method: 'PUT'
      },
      'query': {
          method:'GET',
          isArray:false
      },
      'delete': {
          method:'DELETE'
      }
    });
  }])
  .factory('Studio', ['$resource', function($resource) {
    return $resource('http://api.3drs.synth3tk.com/studios/:id', { id: '@id' }, {
      'save': {
        method: 'PUT'
      },
      'query': {
          method:'GET',
          isArray:false
      },
      'delete': {
          method:'DELETE'
      }
    });
  }]);
angular.module('videoModule', ['ngRoute', 'ui.router', 'slick', 'angular-loading-bar', 'ngAnimate'])
    .controller('ChannelHomeCtrl', ['$scope', '$routeParams', '$rootScope', function ($scope, $routeParams, $rootScope) {
      
    }])
    .controller('WatchVideoCtrl', ['$scope', '$location', function($scope, $location){
      
}]);