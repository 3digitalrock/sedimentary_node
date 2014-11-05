angular.module('apiClient',['ngResource'])
  .factory('Video', ['$resource', function($resource, $location) {
    return $resource('http://api.'+$location.host()+'/videos/:id', { id: '@id' }, {
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
  .factory('Videos', ['$resource', function($resource, $location) {
    return $resource('http://api.'+$location.host()+'/videos', {
      'create': {
        method: 'PUT'
      },
      'query': {
          method:'GET'
      }
    });
  }])
  .factory('Channel', ['$resource', function($resource, $location) {
    return $resource('http://api.'+$location.host()+'/channels/:id', { id: '@id' }, {
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
  .factory('Studio', ['$resource', function($resource, $location) {
    return $resource('http://api.'+$location.host()+'/studios/:id', { id: '@id' }, {
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