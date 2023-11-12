const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        // './web/css/all.scss',
        './web/main',
        'webpack-dev-server/client?http://0.0.0.0:6363',
    ],
    output: {
        publicPath: '/',
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
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
            // {
            //     test: /\.(scss)$/,
            //     use: [{
            //         loader: 'style-loader', // inject CSS to page
            //     }, {
            //         loader: 'css-loader', // translates CSS into CommonJS modules
            //     }, {
            //         loader: 'postcss-loader', // Run post css actions
            //         options: {
            //             plugins() { // post css plugins, can be exported to postcss.config.js
            //                 return [
            //                     require('precss'),
            //                     require('autoprefixer'),
            //                 ];
            //             },
            //         },
            //     }],
            // },
            {
                test: /\.(eot|woff|woff2|ttf|png)$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            Backbone: 'backbone',
            _: 'underscore',
            
        }),
    ],
    devServer: {
        contentBase: './web',
        port: 6363,
        host: '0.0.0.0',
        historyApiFallback: true,
    },
};
