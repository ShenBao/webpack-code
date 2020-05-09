'use strict';

const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join (__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        include: path.resolve (__dirname, 'src'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: path.join (__dirname, 'src/index.html'),
    }),
  ],
};