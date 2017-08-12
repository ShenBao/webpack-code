const path = require('path');

const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

const devConfig = {
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 7777,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
  }
}

module.exports = Merge(CommonConfig, devConfig);