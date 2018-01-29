app.controller('LoginController', ['$scope',  '$uibModalInstance', function($scope,  $uibModalInstance) {
    var Registration = {
        mail: '',
        password: '',
    };

    $scope.newUser = JSON.parse(JSON.stringify(Registration));

	/*booksRepository.getAuthors().then(function(response) {
		$scope.authors = response.data.map(function(author) {
			return {
				id: author.id,
				name: author.firstname + ' ' + author.lastname
			}
		});
	});*/

	$scope.cancel = function() {
		$uibModalInstance.dismiss();
	};

	$scope.ok = function() {
		$uibModalInstance.close($scope.newBook);
	}
}]);