'use strict';

const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const getMPA = require('./getMPA.js');

const {entry, htmlWebpackPlugins} = getMPA();

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'production',
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
  plugins: [new CleanWebpackPlugin(), ...htmlWebpackPlugins],
  devtool: 'hidden-source-map',
};
