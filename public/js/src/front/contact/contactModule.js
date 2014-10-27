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
                	// if successful, bind success message to message and remove form
                    $scope.message = data.message;
                    $scope.success = true;
                }
            });
		};
}]);