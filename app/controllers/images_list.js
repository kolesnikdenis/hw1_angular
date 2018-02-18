app.controller('Images_List', ['$scope', 'Upload', '$timeout','$http', function ($scope, Upload, $timeout, $http) {

    $scope.id=19;
    $scope.table='blog';

    $scope.del_img = function (img_name) {
        console.log($scope.id,$scope.table,img_name);
        var data={
            id:$scope.id,table:$scope.table,del_file: img_name
        };
        $http.post('http://freelance.kolesnikdenis.com/api/delete_file',data).then(
            function (response) {
                //console.log(response.data.status);
                if (response.data.status=="ok"){
                    console.log(response.data);
                    console.log("del index response:",response.data.del_index);
                    $scope.loadfile = $scope.loadfile.filter(function (i){ if ( i.filename != response.data.del_file ) return i })
                    //$scope.loadfile.splice(response.data.del_index,1);
                    console.log("files upload and blog update");
                }
            });
    };

    $scope.uploadFiles = function (files) {
        $scope.files = files;
        if (files && files.length) {
            Upload.upload({
                url: 'https://freelance.kolesnikdenis.com/api/upload_stream',
                data: {
                    files: files,
                    table: $scope.table,
                    id: $scope.id
                }
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                    console.log($scope.result);
                    for ( var i in $scope.result.photos ) {
                        $scope.loadfile.push( { filename: $scope.result.photos[i], alt:$scope.result.photos[i]});
                    }
                    if ($scope.result.status=="ok") {
                        data={table:$scope.table,id:$scope.id,filelist: $scope.loadfile};
                        $http.post('http://freelance.kolesnikdenis.com/api/save_list_img',data).then(
                            function (response) {
                                //console.log(response.data.status);
                                if (response.data.status=="ok") console.log("files upload and blog update");
                        });
                    }
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                    console.log($scope.errorMsg);
                }
            }, function (evt) {
                $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };

    $scope.selectFiles = function (files) {
        console.log(files);
        console.log($scope.loadfile);
        for ( var index_name in files ){
            files[index_name].name
        }
    }
    $scope.getFiles = function () {
        console.log("getFiles");
        $http.post('http://freelance.kolesnikdenis.com/api/test').then(
            function (response) {
                console.log(response.data);
                for ( var i in response.data.db){
                    $scope.loadfile = JSON.parse( response.data.db[i].photos);
                    console.log($scope.loadfile);
                }
            });
    }
    $scope.loadfile= $scope.getFiles();
    //}]);
}]);