'use strict';

const path = require('path');
const glob = require('glob-all');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCss = require('purifycss-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new PurifyCss({
      paths: glob.sync([
        // 传入多文件路径
        path.resolve(__dirname, './*.html'), // 处理根目录下的html文件
        path.resolve(__dirname, './src/*.js'), // 处理src目录下的js文件
      ]),
    }),
  ],
};
