const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './web/css/all.scss',
        './web/main',
        'webpack-dev-server/client?http://localhost:8099',
    ],
    output: {
        publicPath: '/',
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /backbone\.js$/,
                loader: 'imports-loader?define=>false',
            },
            {
                test: /\.js$/,
                include: path.join(__dirname, 'web'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                },
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader',
            },
            {
                test: /\.(eot|woff|woff2|ttf|png)$/,
                loader: 'file-loader',
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            Backbone: 'backbone',
            _: 'underscore',
        }),
        new webpack.IgnorePlugin(/^jquery$/),
    ],
    devServer: {
        contentBase: './web',
        port: 3000,
        host: '0.0.0.0'
    },
};
