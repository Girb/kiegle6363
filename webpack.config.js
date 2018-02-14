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
                test: /\.(eot|woff|woff2|ttf)$/,
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
        port: 8099,
        host: '10.0.0.104'
    },
};
