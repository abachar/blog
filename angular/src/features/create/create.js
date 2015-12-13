angular.module('blog')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/create', {templateUrl: 'features/create/create.html'});
    })
    .controller('CreateController', function ($location, Post) {
        var self = this;

        self.formPost = {
            title: '',
            author: '',
            content: '',
            tags: ''
        };

        self.create = function () {
            Post.create(self.formPost)
                .then(function (code) {
                    $location.path('/show/' + code);
                });
        };
    });