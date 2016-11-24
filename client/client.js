const webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config'),

    path = require('path'),
    express = require('express'),
    app = express(),
    port = 3000,

    compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, function(error) {
    if (error) {
        console.log(error)
    } else {
        console.info("eak eneh udah jalan di port",port)
    }
})