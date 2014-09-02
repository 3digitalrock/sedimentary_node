angular.module('rockSolid', ['angular-loading-bar', 'ngAnimate'])
    .config(function(cfpLoadingBarProvider, $interpolateProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        //$routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
        //$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
        //$routeProvider.otherwise({redirectTo: '/view1'});
    })
    .controller('HomeCtrl', function ($scope, $http) {
        $scope.videoFullscreen = false;
        $scope.fullToggle = function() {
            this.videoFullscreen = !this.videoFullscreen;
            videojs("video-bg").muted(!this.videoFullscreen);
        };
    })
    .controller('VideoCtrl', function ($scope, $http) {
        $http.get('http://api.3drs.synth3tk.com/v0/videos').
            success(function(data) {
                $scope.videos = data;
        });
    })
    .controller('AdminCtrl', function ($scope, $http) {
        
    });
