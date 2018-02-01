app.controller('LoginC', ['$scope',  '$uibModalInstance', function($scope,  $uibModalInstance) {
    var Registration = {
        mail: '',
        password: '',
    };
/*

    console.log('LoginController1')
    $scope.newUser = JSON.parse(JSON.stringify(Registration));
*/

	/*booksRepository.getAuthors().then(function(response) {
		$scope.authors = response.data.map(function(author) {
			return {
				id: author.id,
				name: author.firstname + ' ' + author.lastname
			}
		});
	});*/
/*
	$scope.cancel = function() {
        console.log("cancel");
		$uibModalInstance.dismiss();
	};

	$scope.ok = function() {
		console.log("ok")
		$uibModalInstance.close($scope.newBook);
	}*/
}]);