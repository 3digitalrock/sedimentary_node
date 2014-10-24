angular.module('settingsModule')
  .controller('AdminSettingsFeaturedCtrl', ['$scope', 'WebApi', '$http', 'Restangular', function ($scope, WebApi, $http, Restangular) {
    WebApi.all('featured').get('home').then(function(featured){$scope.featured=featured});

    // Instantiate the bloodhound suggestion engine
    var trailers = new Bloodhound({
      name: 'trailers',
      datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.title); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: []
    });
  
    // initialize the bloodhound suggestion engine
    trailers.initialize();
  
    // Typeahead options object
    $scope.featuredOptions = {
      highlight: true
    };
  
    // Single dataset example
    $scope.trailers = {
      displayKey: 'title',
      source: trailers.ttAdapter()
    };
  
    Restangular.all('trailers').getList({fields: 'uid,title'}).then(function(data){
      trailers.add(data.originalElement);
    });
    
    $scope.addFeatured = function(playlist, uid){
      WebApi.all('featured').customPUT({uid: uid, playlist: playlist});
      $scope.selectedTrailer = null;
    };
}]);