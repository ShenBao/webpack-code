const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    contentBase: path.join(__dirname, "dist"),
    host: 'localhost',
    port: 80,
    compress: true,
    historyApiFallback: true,
    noInfo: true,
    open: true,
  },

  // webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。
  watch: false,

  watchOptions: {
    aggregateTimeout: 300, // 默认值  300
    poll: 1000, //通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
    ignored: /node_modules/, //对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，例如 node_modules
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
  ]
};