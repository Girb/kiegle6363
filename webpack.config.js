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
    ],
  },
  devServer: {
    contentBase: './web',
    port: 8099,
  },
};
