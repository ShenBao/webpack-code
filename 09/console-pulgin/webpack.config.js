'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ConsolePlugin = require('./pulgins/console-pulgin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle_[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new ConsolePlugin({
      dec:1
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    https: true,
    hot: true,
    headers: {
      'X-WebPack-App': 'ShenBao-WebPack-App',
    },
    stats: 'errors-only',
  },
  devtool: 'cheap-source-map',
};
