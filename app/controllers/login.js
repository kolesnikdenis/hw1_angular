app.controller('LoginController', ['$scope', '$http', '$uibModal','localStorageService', function($scope, $http, $uibModal,localStorageService) {

    var Registration = {
        mail: '',
        password: '',
    };


    $scope.open = function (size) {
        console.log("open");
        var modalInstance = $uibModal.open({
            animation: false,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: './app/modals/login/login-form.html',
            controller:function($uibModalInstance ,$scope,items){

                $scope.newUser = JSON.parse(JSON.stringify(Registration));
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                    console.log('well  bye Bye');
                };
                $scope.ok = function() {
                    if (!$scope.newUser.mail || $scope.newUser.password.length <=0 ) { alert("что-то Вы ввели не так .... ")}
                    else {
                        console.log("reg:",$scope.newUser);
                        $uibModalInstance.close($scope.newUser);
                    }
                };

                $uibModalInstance.result.then(function (selectedItem) {
                    console.log("reg user:",selectedItem);
                    loginData={username: selectedItem.mail, password:selectedItem.password};
                    $http.post('//freelance.kolesnikdenis.com/api/account', loginData).then(
                        function (response) {
                            if (response.data.status == "ok" ) {
                                console.log("login Ok:", response.data);
                                localStorageService.set('token', response.data.user_profile.token);
                                localStorageService.set('username', response.data.user_profile.mail);
                                localStorageService.set('username_id', response.data.user_profile.id);
                            }else {
                                console.log("error:",response);
                            }
                        })
                    //modalInstance.close(console.log($scope.newUser));
                }, function () {
                    //console.log('Modal dismissed at: ' + new Date());
                    alert("but why?");
                    //modalInstance.dismiss(console.log($scope.newUser));
                });

            },
            size: size,
            //appendTo: parentElem,
            resolve: {
                items: function () {
                    return $scope;
                }
            }
        });
        console.log(modalInstance);
        /*modalInstance.result.then(function (selectedItem) {
            console.log("tt","ttt");
            //modalInstance.close(console.log($scope.newUser));
        }, function () {
            //console.log('Modal dismissed at: ' + new Date());
            alert("but why?");
            //modalInstance.dismiss(console.log($scope.newUser));
        });*/
    };


    $scope.showRegistrationForm = function () {
        console.log("show form");
        $uibModal.open({
            animation: false,
            templateUrl: 'app/modals/login/login-form.html',
            //template: '<div>hello</div>'
        }).result.catch(function (resp) {
            console.log(resp);
        });
    };

}]);

