console.log("load api controller");

app.controller('api_controller', ['$scope', '$http', function($scope, $http) {
    $scope.items = [];
    $scope.out_text = "text";
    $scope.show = function(text){
        alert(text);
    }
    $scope.showCategories = function(){
        var dataObj = {
            task : 'get_categories'
        };

        var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}
        function restruct(in_data,def,add_data) {
            var out=[];
            for ( key in in_data ) {
                if (in_data[key].subsections == 0 ) {
                    out.push({id: in_data[key].id,name: in_data[key].name, subb:[]});
                }
                else {
                    for ( kk in out ) {
                        if ( out[kk].id == in_data[key].subsections) {
                            out[kk].subb.push({id: in_data[key].id,name: in_data[key].name, subb:[]});
                        }else {
                            for ( kkk in out[kk].subb ) {
                                if ( out[kk].subb[kkk].id == in_data[key].subsections) {
                                    out[kk].subb[kkk].subb.push({id: in_data[key].id,name: in_data[key].name, subb:[]});
                                }
                            }
                        }
                    }
                }
            }
            return (out);
        }
        function get_last_workk() {
            return new Promise((resolve) => {
                $http.post('https://kolesnikdenis.com/a-level/test/api.php', "data=" + JSON.stringify(dataObj), config).then(
                function (response) {
                    var sql = JSON.parse(response.data.sql);
                    var out=[];
                    sql.map(function (item) {
                        //console.log(item);
                        out.push(item);
                    })
                    resolve(out)
                });
            });
        };
        get_last_workk().then((res_sel_rig_last) => {
            $scope.items  = res_sel_rig_last;

            //show_menu($scope.items);

            $scope.items=restruct($scope.items);
            console.log($scope.items);
            //$scope.out_text = JSON.stringify($scope.items);
        });
        //$scope.out_text="sss";
    };
}])