const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
      // contentBase: commonPath.public,
      host: 'localhost',
      port: 3000,
      // 启用 HMR 需要 new webpack.HotModuleReplacementPlugin()
      // hot: true,
      // hotOnly: true, //HMR
      // historyApiFallback: true,
      // publicPath: commonPath.public,
      // headers: { "X-Custom-Header": "yes" },
      // stats: { colors: true }
      // quiet: false,
      // progress: true,//报错无法识别，删除后也能正常刷新
      // inline: true,
      // clientLogLevel: "info",
      // lazy: false,
      // stats: 'errors-only',
      // compress: true,
      // noInfo: true,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
  };