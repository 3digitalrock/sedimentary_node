angular.module('rockSolid', ['ngRoute','ngAnimate'])
    .config(function($interpolateProvider) {
        //cfpLoadingBarProvider.includeSpinner = false;
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
          $routeProvider
            .when('/dashboard', {
              templateUrl: 'views/home.html',
              controller: 'AdminDashboardCtrl'
            })
            .when('/video/:videoId', {
              templateUrl: 'views/video_detail.html',
              controller: 'AdminVideoCtrl',
              controllerAs: 'video'
            })
            .when('/studio/:studioId', {
              templateUrl: 'views/studio_detail.html',
              controller: 'AdminStudioCtrl',
              controllerAs: 'studio'
            }).
            otherwise({
              redirectTo: '/dashboard'
            });
    }])
    .controller('HomeCtrl', function ($scope, $http) {
        $scope.videoFullscreen = false;
        $scope.fullToggle = function() {
            this.videoFullscreen = !this.videoFullscreen;
            videojs("video-bg").muted(!this.videoFullscreen);
        };
    })
    .controller('VideoCtrl', function ($scope, $http) {
        $http.get('http://api.3drs.synth3tk.com/videos').
            success(function(data) {
                $scope.videos = data;
        });
    })
    .controller('AdminDashboardCtrl', function ($scope, $http) {
        $http.get('http://api.3drs.synth3tk.com/videos').
            success(function(data) {
                console.log(data.items);
                $scope.videos = data.items;
        });
    })
    .controller('AdminVideoCtrl', ['$scope','$http','$routeParams', function ($scope, $http, $routeParams) {
        $http.get('http://api.3drs.synth3tk.com/videos/'+$routeParams.videoId).
            success(function(data) {
                console.log(data);
                $scope.video = data;
        });
    }]);
