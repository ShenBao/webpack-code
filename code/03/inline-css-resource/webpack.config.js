'use strict';

const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
      inlineSource: '.css$',
      template: path.join (__dirname, 'src/index.html'),
    }),
    new HTMLInlineCSSWebpackPlugin()
  ],
};
