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
        }).otherwise('/');

});