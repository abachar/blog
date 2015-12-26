angular.module('blog')
    .factory('Post', function ($http) {
        /** find all posts */
        var findAll = function () {
            return $http.get('/posts')
                .then(function (response) {
                    return response.data;
                });
        };

        /** find post by code */
        var findByCode = function (code) {
            return $http.get('/posts/' + code)
                .then(function (response) {
                    return response.data;
                });
        };

        /** Create a new post */
        var create = function (post) {
            return $http.post('/posts', {
                title: post.title,
                author: post.author,
                content: post.content,
                tags: post.tags
            }).then(function (response) {
                return response.data.code;
            });
        };

        /** append comment in a post */
        var addComment = function (code, comment) {
            return $http.post('/posts/' + code + '/comments', {
                author: comment.author,
                content: comment.content
            });
        };

        return {
            findAll: findAll,
            findByCode: findByCode,
            create: create,
            addComment: addComment
        };
    });