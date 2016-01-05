var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    config = require('./webpack.config'),
    devMiddleware = require('webpack-dev-middleware'),
    hotMiddleware = require('webpack-hot-middleware'),
    app = express(),
    compiler = webpack(config),
    indexPath = path.join(__dirname, 'index.html');

app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(hotMiddleware(compiler));

app.get('/', function (req, res) {
    res.sendFile(indexPath);
});

var server = app.listen(3000, function () {
    console.log('Express server listening on port ' + server.address().port);
});