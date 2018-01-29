//    app.controller('BooksListController', ['$scope', function ($scope) { } ] )

    app.controller('BooksListController', ['$scope',function ($scope) {
        $scope.orderField='date';

        var bookModel = {
                title: '',
                author: '',
                rate: 0,
                cost: 0,
                date: ''
            };
        $scope.newBook = JSON.parse(JSON.stringify(bookModel));

        $scope.books = [
            {
                title: 'You don\'t know JS',
                author: 'key',
                rate: 10,
                cost: 11,
                date: '2014-04-44'
            },
            {
                title: 'You don\'t know JS',
                author: 'key',
                rate: 10,
                cost: 22,
                date: '23456567890333'
            },
            {
                title: 'Harry Ptter and The Philosopher\'s Strone',
                author: 'Joanne Rowling',
                rate: 10,
                cost: 100,
                date: '2014-12-01'
            },
            {
                title: 'Kolobok',
                author: 'Joanne Rowling',
                rate: 10,
                cost: 100,
                date: '2014-06-23'
            }];

        $scope.orderBy= function (field) {
            $scope.orderField = $scope.orderField ===field ? ['-', field].join(''): field;
        };

        $scope.deleteBook = function (index) {
            $scope.books.splice(index,1);
        };

        $scope.addBook = function () {
            $scope.books.push($scope.newBook);
            $scope.newBook = (JSON.parse(JSON.stringify(bookModel)));
        }

        $scope.value = "test";
}])
