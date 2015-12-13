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
    html: 'src/**/*.html',
    styles: 'src/**/*.less',
    scripts: 'src/**/*.js'
};

var build = 'build/';

/**
 * Task styles: compile and concat all less files
 */
gulp.task('styles', function () {
    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.css',
            sources.styles
        ])
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(build));
});

function getTemplates() {
    return gulp.src([sources.html, '!src/index.html'])
        .pipe(template({module: 'blog'}));
}

/**
 * Task scripts: compile and concat all js files
 */
gulp.task('scripts', function () {
    return gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.js',
            'src/app.js',
            sources.scripts
        ])
        .pipe(addStream.obj(getTemplates()))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(build));
});

gulp.task('test', ['scripts'], function (done) {
    new karma({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    }, done).start();
});

/**
 * Task scripts: compile and concat all js files
 */
gulp.task('copy-index', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest(build));
});

gulp.task('serve', ['build'], function () {
    gulp.watch(sources.styles, ['styles']);
    gulp.watch(['src/app.js', sources.html, sources.scripts], ['scripts']);

    server.listen({path: 'server.js'});
});

/*
 gulp.watch ['bower.json', sources.styles], ['styles']
 gulp.watch ['bower.json', sources.scripts], ['scripts']
 gulp.watch(sources.need_reload).on 'change', server.restart*/

// Default task
gulp.task('build', ['copy-index', 'styles', 'scripts']);
gulp.task('default', ['build']);