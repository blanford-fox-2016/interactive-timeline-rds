var path = require('path'),
    webpack = require('webpack')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'), 
        filename: 'bundle.js', //keluarannya jadi bundle
        publicPath: '/static' //virtual path jadi /static/bundle
    },
    plugins: [ //buat aktivasi reload. kaya nodemon
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
        {
            test: /\.js$/, //semua file js
            loaders: ['babel'],
            exclude: /node_modules/,
            include: __dirname
        },
        {
            test: /\.css?$/, //semua file css
            loaders: ['style', 'raw'], 
            include: __dirname
        }
        ]
    }
}
