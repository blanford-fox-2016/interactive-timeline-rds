var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var confic = require('./webpack.config')

var path = require('path')
var express = require('express')
var app = express()
var port = 8000

var compiler = webpack(confic)

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: confic.output.publicPath}))
app.use(webpackHotMiddleware(compiler))

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, function (error) {
    if (error) {
        console.log(error)
    }
    else {
        console.info("Server is running")
    }
})