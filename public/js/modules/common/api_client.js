angular.module('apiClient',[]).factory('$apiClientService', ['$http', function($http) {
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
}]);