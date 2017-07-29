var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ["webpack/hot/dev-server", './index'],
  target: "atom",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static'
  },
  resolve: {
      root: [path.join(__dirname, "/node_modules")],
      extensions: ["", ".js", ".jsx", ".json"],
      packageMains: ["webpack", "browser", "web", "browserify", ["jam", "main"], "main"],
      alias: {
        //   "utils": path.resolve(__dirname, "./src/utils"),
        //   "generatorUtils": path.resolve(__dirname, "./src/utils/generatorUtils"),
        //   "assets": path.resolve(__dirname, "./public/assets"),
        //   "api": path.resolve(__dirname, "./src/app/api"),
        //   "library": path.resolve(__dirname, "./src/app/home/library"),
        //   "components": path.resolve(__dirname, "./src/app/home/index/components"),
        //   "helpers": path.resolve(__dirname, "./src/app/home/helpers")
      }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
        preLoaders: [
            { test: /\.jsx?$/, loader: "eslint", exclude: /node_modules/ }
        ],
        loaders: [
            {
                test: /\.js|jsx?$/,
                loader: "babel-loader",

                exclude: /node_modules/,
                query: {
                    presets: ["react", "es2015", "es2016", "stage-0"]
                }
            },
            { test: /\.json$/, loader: "json" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=100000000000" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000000000" },
            { test: /bootstrap-sass\/assets\/javascripts\//, loader: "imports?jQuery=jquery" },
            { test: /\.png$/, loader: "url-loader?limit=100000000" },
            { test: /\.jpg$/, loader: "url-loader?limit=100000000" }
        ]
    },

    // eslint: {
    //     failOnWarning: false,
    //     failOnError: true
    // },
    devServer: {
        hot: true,
            setup() {
                if (process.env.START_HOT) {
                spawn(
                    "npm",
                    ["run", "start"],
                    { shell: true, env: process.env, stdio: 'inherit' }
                )
                .on("close", code => process.exit(code))
                .on("error", spawnError => console.error(spawnError));
            }
        }
    }

}
