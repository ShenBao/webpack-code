const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js',
  },
  // __webpack_public_path__ : 'testtest',
  output: {
    filename: '[name].[chunkhash:30].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: "/assets/",
    // publicPath: "http://cdn.com/assets/",
    //你也可以加上完整的url，效果与上面一致（不需要修改index.html中引用bundle.js的路径，但发布生产环境时，需要使用插件才能批量修改引用地址为cdn地址）。
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    // contentBase: path.join(__dirname, "dist"),
    port: 7777,
    // host: 'localhost',
    // hot: true,
    // inline: true,
    // filename: '[name].js',
    // historyApiFallback: true,
    // publicPath: '/assets/',
    // proxy: {
    //     "/api": {
    //         target: "http://localhost:8075",
    //         secure: false
    //     }
    // }
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    // 提取公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    // 第一个插件是 NamedModulesPlugin，将使用模块的路径，而不是数字标识符。虽然此插件有助于在开发过程中输出结果的可读性，然而执行时间会长一些。第二个选择是使用 HashedModuleIdsPlugin，推荐用于生产环境构建：
    new webpack.HashedModuleIdsPlugin(),
  ],
};