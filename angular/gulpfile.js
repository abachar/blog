var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var template = require('gulp-angular-templatecache');
var addStream = require('add-stream');
var server = require('gulp-develop-server');
var karma = require('karma').Server;

/**
 * Define paths
 */
var sources = {
    templates: [
        'src/**/*.html',
        '!src/index.html'
    ],
    styles: [
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'src/**/*.less'
    ],
    scripts: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js',
        'src/app.js',
        'src/**/*.js'
    ]
};

var build = 'build/';

/**
 * Task styles: compile and concat all less files
 */
gulp.task('styles', function () {
    return gulp.src(sources.styles)
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(build));
});

/**
 * Task scripts: compile and concat all js files
 */
gulp.task('scripts', function () {
    function getTemplates() {
        return gulp.src(sources.templates)
            .pipe(template({module: 'blog'}));
    }

    return gulp.src(sources.scripts)
        .pipe(addStream.obj(getTemplates()))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(build));
});

gulp.task('specs', ['scripts'], function (done) {
    new karma({
        configFile: __dirname + '/test/specs/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('assets', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest(build));
});

gulp.task('serve', ['build'], function () {
    gulp.watch(sources.styles, ['styles']);
    gulp.watch(['src/app.js', sources.templates, sources.scripts], ['scripts']);

    server.listen({path: 'test/server.js'});
});

gulp.task('build', ['assets', 'styles', 'scripts']);