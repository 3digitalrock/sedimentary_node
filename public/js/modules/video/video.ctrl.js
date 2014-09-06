angular.module('videoApp', ['ngRoute', 'apiClient'])
    .config(function($interpolateProvider) {
        //cfpLoadingBarProvider.includeSpinner = false;
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
          $routeProvider
            .when('/', {
              templateUrl: 'views/partials/channel_home.html',
              controller: 'ChannelHomeCtrl'
            })
            .when('/:videoId', {
              templateUrl: 'views/partials/channel_details.html',
              controller: 'ChannelDetailsCtrl'
            })
            .otherwise({
              redirectTo: '/'
            });
    }])
    .controller('ChannelHomeCtrl', ['$scope', '$routeParams', 'Video', function ($scope, $routeParams, Video) {
        Video.query().$promise.then(function(videos){
            $scope.videos = videos.items;
        }, function(errResponse) {
            // fail
        });
    }]);