app.controller('LoginController', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {

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
                        console.log("reg:"+$scope.newUser);
                        $uibModalInstance.close($scope.newUser);
                    }
                };

                $uibModalInstance.result.then(function (selectedItem) {
                    console.log("reg user:",selectedItem);
                    selectedItem['task'] = 'registration';
                    selectedItem['login'] = selectedItem['mail'];
                    console.log("send data:",selectedItem);
                    var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}
                    $http.post('//kolesnikdenis.com/a-level/test/api.php', "data=" + JSON.stringify(selectedItem), config).then(
                        function (response) {
                            //var data = JSON.parse(response.data);
                            if (response.data.status == "true" ) {
                                if (response.data.msg) alert(response.data.msg);
                            }else {
                                if (response.data.msg) alert(response.data.msg);
                                else {
                                    alert("возникла ошибка...")
                                }
                            }
                            console.log(response.data)

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

