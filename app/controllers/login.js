app.controller('LoginController', ['$scope', '$http','$uibModal', function($scope, $http,$uibModal) {
    console.log("LoginController");



    $scope.showRegistrationForm = function () {

        console.log("show form");
        $uibModal.open({
            //templateUrl: 'app/modals/login/login-form.html',
            template: '<div>hello</div>'
        }).result.catch(function (resp) {
            if (['cancel', 'backdrop click', 'escape key press'].indexOf(resp) === -1) throw resp;
        });
    };

}])