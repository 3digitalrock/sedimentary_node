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
angular.module('contactModule', [])
    .controller('formCtrl', ['$scope', '$http', function($scope, $http){
        // Based on the tutorial at http://scotch.io/tutorials/javascript/submitting-ajax-forms-the-angularjs-way
        
        $scope.formData = {};
        
		$scope.processForm = function() {
        	$http({
                method  : 'POST',
                url     : 'contact?json=true',
                data    : $.param($scope.formData),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
            .success(function(data) {
                console.log(data);
    
                if (!data.success) {
                	// if not successful, bind errors to error variables
                    $scope.errors = data.errors;
                } else {
                    $scope.errors = [];
                	// if successful, bind success message to message
                    $scope.message = data.message;
                }
            });
		};
}]);
angular.module('frontend', ['videoModule', 'contactModule'])
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