angular.module('blog')
    .filter('nl2br', function ($sce) {
        return function (msg) {
            msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
            return $sce.trustAsHtml(msg);
        }
    });