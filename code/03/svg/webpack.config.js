'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
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
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.svg/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: '[name].[ext]',
          //   },
          // },
          // {
          //   loader: 'url-loader',
          //   options: {
          //     name: '[name].[ext]',
          //     limit: 200 * 1024, // 为了测试，设置大了点
          //   },
          // },
          {
            loader: 'svg-inline-loader',
          }
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
  ],
};
