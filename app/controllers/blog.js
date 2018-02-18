app.controller('BlogController', ['$scope', '$http', 'localStorageService',  'Upload', '$timeout', function($scope, $http, localStorageService,Upload, $timeout) {
    console.log("load blog controller");
    $scope.bloglist=[];

    $scope.title="";
    $scope.datatime="";
    $scope.content="";
    $scope.categories="";
    $scope.photos=[];
    $scope.id=0;

    $scope.files = "";
    $scope.table='blog'; // что то придумаю с этим
    $scope.errorMsg="";

    $scope.uploadFiles = function (files) {
        $scope.files = files;
        if (files && files.length) {
            Upload.upload({
                url: '//freelance.kolesnikdenis.com/api/upload_stream',
                data: {
                    files: files,
                    table: $scope.table,
                    id: $scope.id
                }
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                    for ( var i in $scope.result.photos ) {
                        $scope.photos.push( { filename: $scope.result.photos[i], alt:$scope.result.photos[i]});
                    }
                    if ($scope.result.status=="ok") {
                        data={table:$scope.table,id:$scope.id,filelist: $scope.photos};
                        $http.post('//freelance.kolesnikdenis.com/api/save_list_img',data).then(
                            function (response) {
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

    $scope.del_img = function (img_name) {
        console.log($scope.id,$scope.table,img_name);
        var data={
            id:$scope.id,table:$scope.table,del_file: img_name
        };
        $http.post('//freelance.kolesnikdenis.com/api/delete_file',data).then(
            function (response) {
                if (response.data.status=="ok"){
                    $scope.photos = $scope.photos.filter(function (i){ if ( i.filename != response.data.del_file ) return i })
                }
            });
    };

    $scope.show = function (id) {
        $http.get('//freelance.kolesnikdenis.com/api/blog_user/'+localStorageService.get('username_id')+'/'+id).then(
            function (response) {
                for ( var i in response.data.blog_array){
                    $scope.title=response.data.blog_array[i].title;
                    $scope.id=response.data.blog_array[i].id;
                    $scope.datatime=response.data.blog_array[i].datatime;
                    $scope.content=response.data.blog_array[i].content;
                    $scope.categories=response.data.blog_array[i].categories;
                    $scope.photos=JSON.parse(response.data.blog_array[i].photos);
                }
            });
    };

    $scope.getBlog = function () {
        $http.get('//freelance.kolesnikdenis.com/api/blog_user/'+localStorageService.get('username_id')).then(
            function (response) {
                for ( var i in response.data.blog_array){
                    $scope.bloglist.push(response.data.blog_array[i] );
                }
            });
    };

    if ($scope.bloglist.length ==0) {
        console.log("first load");
        $scope.getBlog();
    }
}])
