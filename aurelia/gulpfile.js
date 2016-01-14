var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var notify = require("gulp-notify");
var karma = require('karma').Server;
var server = require('gulp-develop-server');
var proxy = require('http-proxy-middleware');

var paths = {
    root: 'src/',
    source: 'src/**/*.js',
    html: 'src/**/*.html',
    css: 'src/**/*.css',
    style: 'styles/**/*.css',
    output: 'build/',
    e2eSpecsSrc: 'test/e2e/src/*.js',
    e2eSpecsDist: 'test/e2e/dist/'
};

gulp.task('clean', function () {
    return gulp.src([paths.output])
        .pipe(vinylPaths(del));
});

// lint

gulp.task('build-system', function () {
    return gulp.src(paths.source)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed(paths.output, {extension: '.js'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel())
        .pipe(sourcemaps.write({includeContent: true}))
        .pipe(gulp.dest(paths.output));
});

gulp.task('build-html', function () {
    return gulp.src(paths.html)
        .pipe(changed(paths.output, {extension: '.html'}))
        .pipe(gulp.dest(paths.output));
});

gulp.task('build-css', function () {
    return gulp.src(paths.css)
        .pipe(changed(paths.output, {extension: '.css'}))
        .pipe(gulp.dest(paths.output))
        .pipe(browserSync.stream());
});

gulp.task('build', function (callback) {
    return runSequence(
        'clean',
        ['build-system', 'build-html', 'build-css'],
        callback
    );
});

// e2e

gulp.task('test', function (done) {
    new karma({
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tdd', function (done) {
    new karma({
        configFile: __dirname + '/../../karma.conf.js'
    }, done).start();
});

gulp.task('backend-server', function (done) {
    server.listen({path: 'test/server.js'}, done);
});

gulp.task('serve', ['backend-server', 'build'], function (done) {
    browserSync({
        online: false,
        open: false,
        port: 3000,
        server: {
            baseDir: '.',
            middleware: [proxy('/posts', {
                target: 'http://localhost:8080',
                changeOrigin: true
            })]
        }
    }, done);
});

gulp.task('watch', ['serve'], function () {
    gulp.watch(paths.source, ['build-system', browserSync.reload]);
    gulp.watch(paths.html, ['build-html', browserSync.reload]);
    gulp.watch(paths.css, ['build-css']);
    gulp.watch(paths.style, function () {
        return gulp.src(paths.style)
            .pipe(browserSync.stream());
    });
});