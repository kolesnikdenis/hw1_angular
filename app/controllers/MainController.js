app.controller('MainController', ['$scope',function ($scope) {
    console.log("hello");
    $scope.x=6;
    $scope.y=7;
    $scope.z=[1,2,3];
    $scope.summ=0;
    $scope.calc= function () {
        $scope.summ = +$scope.x + +$scope.y
    }
}]);
