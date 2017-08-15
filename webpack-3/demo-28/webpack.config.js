const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');


module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name]-[chunkhash:12].js',
    sourceMapFilename: '[file].map', 
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',// 开发环境
  devServer: {
    contentBase: './dist',
    port: 7777,
    host: 'localhost',
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [
          'style',
          'css'
        ]
      },
    ]
  },

  resolveLoader: {
      modules: ["node_modules"],
      extensions: [".js", ".json"],
      mainFields: ["loader", "main"],
      moduleExtensions: ['-loader'], 
      
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    // 构建优化插件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].min.js',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    new ExtractTextPlugin({
      filename: 'build.min.css',
      allChunks: true,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 编译时(compile time)插件
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    // webpack-dev-server 强化插件
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],



};