var path = require('path');
var webpack = require('webpack');
var debug = process.env.NODE_ENV !== 'production';

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool: debug ? "inline-sourcemap" : false,
    entry: './js/Client.js',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['stage-2', 'es2015', 'react'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader/url', 'file-loader']
            }
        ]
    },
    output: {
        path: __dirname + '/src/dist',
        filename: 'app.min.js'
    },
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    plugins: debug ? [] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new UglifyJSPlugin({
            mangle: false,
            sourceMap: false
        })
    ]
}