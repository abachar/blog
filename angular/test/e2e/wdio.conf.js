exports.config = {
    specs: [
        './**/*.e2e.js'
    ],
    exclude: [],
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'silent',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost:3000',
    waitforTimeout: 10000,
    // Mocha: `$ npm install mocha`
    // Jasmine: `$ npm install jasmine`
    // Cucumber: `$ npm install cucumber`
    framework: 'jasmine',
    reporter: 'spec',
    jasmineNodeOpts: {}
    /*mochaOpts: {
        ui: 'bdd'
    },*/
};