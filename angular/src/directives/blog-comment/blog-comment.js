angular.module('blog')
    .directive('blogComment', function ($filter) {
        return {
            scope: {
                comment: '=blogComment'
            },
            templateUrl: 'directives/blog-comment/blog-comment.html',
            link: function (scope) {
                scope.createdAt = $filter('date')(scope.comment.createdAt, 'dd MMMM yyyy');
            }
        };
    });