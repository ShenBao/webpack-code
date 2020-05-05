'use strict';

const path = require('path');
const getMPA = require('./getMPA.js');

const {entry, htmlWebpackPlugins} = getMPA();

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'development',
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
  plugins: htmlWebpackPlugins,
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  devtool: 'cheap-module-eval-source-map',
};
