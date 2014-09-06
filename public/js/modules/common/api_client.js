angular.module('apiClient',['ngResource']).factory('Video', ['$resource', function($resource) {
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
}]);