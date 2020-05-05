'use strict';

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const {
  WebpackBundleSizeAnalyzerPlugin,
} = require('webpack-bundle-size-analyzer');

const JSBanner = `这是 BannerPlugin 注入的内容
https://github.com/ShenBao
Copyright 2016 - Present`;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]__[id]__[chunkhash].js',
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
  plugins: [
    new ProgressBarPlugin(),
    new webpack.BannerPlugin(JSBanner),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules/],
    }),
    // new AssetsPlugin(),
    new ManifestPlugin(),
    new WebpackMd5Hash(),
    new WebpackBundleSizeAnalyzerPlugin('./bundle-size-analyzer.log'),
  ],
};
