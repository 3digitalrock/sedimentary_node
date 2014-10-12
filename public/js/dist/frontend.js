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
angular.module('frontend', ['videoModule'])
    .config(['$interpolateProvider', '$locationProvider', function($interpolateProvider, $locationProvider) {
        //cfpLoadingBarProvider.includeSpinner = false;
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $locationProvider.html5Mode(true);
    }])
    .controller('HomeVideoCtrl', ['$scope', function ($scope) {
        $scope.videoFullscreen = false;
        $scope.fullToggle = function() {
            this.videoFullscreen = !this.videoFullscreen;
            videojs("video-bg").muted(!this.videoFullscreen);
        };
    }]);