app.controller('ValidationController', ['$scope', '$route','$http', function($scope,$route,$http) {
    console.log("ValidationController",$route.current.params.session_id,$route.current.params.mail);
    var selectedItem={};
    selectedItem['task'] = 'email_verification';
    selectedItem['session_id'] = $route.current.params.session_id;
    selectedItem['login']=$route.current.params.mail;
    var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}
    $http.post('//kolesnikdenis.com/a-level/test/api.php', "data=" + JSON.stringify(selectedItem), config).then(
        function (response) {
            //var data = JSON.parse(response.data);
            if (response.data.status == "true" ) {
                if (response.data.msg) alert(response.data.msg);
                else  alert("вы активировали свой акаунт");
            }else {
                if (response.data.msg) alert(response.data.msg);
                else {
                    alert("возникла ошибка...")
                }
            }
            console.log(response.data)

        })
}]);