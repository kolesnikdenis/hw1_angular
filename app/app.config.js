app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/", {
            templateUrl : "app/views/main.html"
        })
        .when("/book", {
            templateUrl : "app/views/bookslist.html",
            controller: 'BooksListController'
        })
        .when("/map", {
            templateUrl : "app/views/GoogleMap.html",
	    controller: 'MapController'
        })
        .when("/valid/:session_id/:mail", {
            templateUrl : "app/views/validation.html",
            controller: 'ValidationController'
        })
        .when("/upload_img", {
            templateUrl : "app/views/images.html",
            controller: 'Images_List'
        })
        .when("/blog", {
        templateUrl : "app/views/blog_controller.html",
        controller: 'BlogController'
    }).otherwise('/');
});



app.factory('authInterceptor', function (AuthService) {
    return {
        request: function (config) {
            const auth = AuthService.getAuthData();
            console.log(auth)
            if (config.url.match(/^http:\/\/freelance\.kolesnikdenis\.com\/api/)) {
                config.headers['Auth'] = JSON.stringify(auth);
            }
            return config;
        }
    }
});
app.config(function ($httpProvider) {
    console.log("push");
    console.log($httpProvider.interceptors);
    $httpProvider.interceptors.push('authInterceptor');
});