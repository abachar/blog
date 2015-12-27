module.exports = function (config) {
    config.set({
        basePath: '../../',
        browsers: [
            'PhantomJS'
            // , 'Chrome'
            // , 'Firefox'
            // , 'Safari'
        ],
        frameworks: ['jasmine'],
        reporters: ['spec'],
        colors: true,
        logLevel: config.LOG_INFO,
        files: [
            'build/bundle.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/moment/moment.js',
            'test/specs/**/*.spec.js'
        ]
    });
};