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
            .when('/videos/upload', {
              templateUrl: 'views/video_create.html',
              controller: 'AdminVideoCreateCtrl',
              controllerAs: 'upload'
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
    .factory('dataFactory', ['$http', function($http) {
        var urlBase = 'http://api.3drs.synth3tk.com';
        var dataFactory = {};
    
        dataFactory.getVideos = function () {
            return $http.get(urlBase + '/videos');
        };
    
        dataFactory.getVideo = function (id) {
            return $http.get(urlBase + '/videos/' + id);
        };
    
        dataFactory.updateVideo = function (video) {
            return $http.put(urlBase + '/videos/' + video.ID, video);
        };
    
        dataFactory.deleteVideo = function (id) {
            return $http.delete(urlBase + '/videos/' + id);
        };
    
        return dataFactory;
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
    .controller('AdminDashboardCtrl', ['$scope', 'dataFactory', function ($scope, dataFactory) {
        $scope.videos;
        
        getVideos();
    
        function getVideos() {
            dataFactory.getVideos()
                .success(function (vids) {
                    $scope.videos = vids.items;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load videos: ' + error.message;
                });
        }
    }])
    .controller('AdminVideoCtrl', ['$scope','dataFactory','$routeParams', function ($scope, dataFactory, $routeParams) {
        $scope.video;
        
        getVideo($routeParams.videoId);
        
        function getVideo(vidID) {
            dataFactory.getVideo(vidID)
                .success(function (vid) {
                    console.log(vid);
                    $scope.video = vid;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load video: ' + error.message;
                });
        }
    }])
    .controller('AdminVideoCreateCtrl', function () {
        
    });
