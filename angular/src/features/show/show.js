angular.module('blog')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/show/:code', {templateUrl: 'features/show/show.html'});
    })
    .controller('ShowController', function ($routeParams, Post) {
        var code = $routeParams.code;
        var self = this;

        self.formComment = {
            author: '',
            content: ''
        };

        Post.findByCode(code)
            .then(function (post) {
                self.post = post;
            });

        self.send = function () {
            Post.addComment(code, self.formComment)
                .then(function () {
                    self.post.comments.push({
                        createdAt: new Date(),
                        author: self.formComment.author,
                        content: self.formComment.content
                    });
                    self.formComment.author = '';
                    self.formComment.content = '';
                });
        };
    });