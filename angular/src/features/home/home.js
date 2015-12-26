angular.module('blog')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'features/home/home.html'})
            .otherwise({redirectTo: '/'});
    })
    .controller('IndexController', function (Post) {
        var self = this;

        Post.findAll()
            .then(function (posts) {
                self.posts = posts
            });
    });