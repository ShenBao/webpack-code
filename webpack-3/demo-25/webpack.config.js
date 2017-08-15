const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    app: './src/index.js',
  },

  output: {
    filename: '[name]-[chunkhash:12].js',
        // [hash]  模块标识符(module identifier)的 hash
        // [chunkhash] chunk 内容的 hash
        // [name]  模块名称
        // [id]  模块标识符(module identifier)
        // [query] 模块的 query，例如，文件名 ? 后面的字符串

    sourceMapFilename: '[file].map', //此选项会向硬盘写入一个输出文件，只在 devtool 启用了 SourceMap 选项时才使用。默认使用 "[file].map";[name], [id], [hash] 和 [chunkhash] 替换符号,建议只使用 [file] 占位符

    sourcePrefix: "\t", //修改输出 bundle 中每行的前缀。一般情况下  不需要

    // hashDigest: 'hex', // 生成 hash 时使用的编码方式 'hex' 'latin1' or 'base64'
    // hashDigestLength: 10, //散列摘要的前缀长度，默认为 20
    // hashFunction: 'md5',//散列算法，默认为 'md5'。支持 Node.JS crypto.createHash 的所有功能。 'sha256', 'sha512'
    // hotUpdateChunkFilename: '[id].[hash].hot-update.js',  //自定义热更新 chunk 的文件名。占位符只能是 [id] 和 [hash]，默认值是： "[id].[hash].hot-update.js"

    // hotUpdateFunction: //只在 target 是 web 时使用，用于加载热更新(hot update)的 JSONP 函数。
    // hotUpdateMainFilename: 自定义热更新的主文件名(main filename)。可选的值的详细信息占位符只能是 [hash]，默认值是：hotUpdateMainFilename: "[hash].hot-update.json"
    // jsonpFunction: 只在 target 是 web 时使用，用于按需加载(load on-demand) chunk 的 JSONP 函数。
    // library
    // libraryExport
    // libraryTarget

    // strictModuleExceptionHandling：如果一个模块是在 require 时抛出异常，告诉 webpack 从模块实例缓存(require.cache)中删除这个模块。出于性能原因，默认为 false。
    // umdNamedDefine： 当使用了 libraryTarget: "umd"，设置：umdNamedDefine: true

    path: path.resolve(__dirname, 'dist/assets'),

    pathinfo: false, //  生产环境(production) 默认值
    // pathinfo: true, //  开发环境

    publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
    // publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
    // publicPath: "/assets/", // 相对于服务(server-relative)
    // publicPath: "assets/", // 相对于 HTML 页面
    // publicPath: "../assets/", // 相对于 HTML 页面
    // publicPath: "", // 相对于 HTML 页面（目录相同）

  },
  
  devtool: 'source-map',// 开发环境

  // eval  生成后的代码
  // cheap-eval-source-map 转换过的代码（仅限行）
  // cheap-source-map   转换过的代码（仅限行）
  // cheap-module-eval-source-map  原始源码（仅限行）
  // cheap-module-source-map 原始源码（仅限行）
  // eval-source-map 原始源码
  // source-map  原始源码
  // inline-source-map 原始源码
  // hidden-source-map 原始源码
  // nosources-source-map  无源码内容
  
  devServer: {
    contentBase: './dist',
    port: 7777,
    host: 'localhost',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
  ],

};