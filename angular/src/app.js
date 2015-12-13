angular.module('blog', ['ngRoute'])
    .config(function ($sceProvider) {
        $sceProvider.enabled(false);
    });