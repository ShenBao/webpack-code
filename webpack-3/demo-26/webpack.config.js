const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    app: './src/index.js',
  },

  output: {
    filename: '[name]-[chunkhash:12].js',
    sourceMapFilename: '[file].map', //此选项会向硬盘写入一个输出文件，只在 devtool 启用了 SourceMap 选项时才使用。默认使用 "[file].map";[name], [id], [hash] 和 [chunkhash] 替换符号,建议只使用 [file] 占位符
    path: path.resolve(__dirname, 'dist'),
  },
  
  devtool: 'source-map',// 开发环境

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

  module: {

    noParse: /jquery|lodash/,
    // 从 webpack 3.0.0 开始
    noParse: function(content) {
      return /jquery|lodash/.test(content)
    },

    rules: [
      {
        enforce: 'pre', // 可能的值有："pre" | "post" 指定 loader 种类。没有值表示是普通 loader。
        // exclude: // Rule.resource.exclude 的简写
        // include: // Rule.resource.include 的简写
        // issuer: 条件会匹配 issuer
        //  test
        //  include
        //  exclude 
        //  resource
        // loader  Rule.use: [ { loader } ]的简写

        // oneOf: [
        //   {
        //     resourceQuery: /inline/, // foo.css?inline
        //     use: 'url-loader'
        //   },
        //   {
        //     resourceQuery: /external/, // foo.css?external
        //     use: 'file-loader'
        //   }
        // ]

        // options Rule.use: [ { options } ]  由于需要支持 Rule.options 和 UseEntry.options，Rule.use，Rule.query 已废弃。
        // query Rule.use: [ { options } ]

        // parser: {
        //   amd: false, // 禁用 AMD
        //   commonjs: false, // 禁用 CommonJS
        //   system: false, // 禁用 SystemJS
        //   harmony: false, // 禁用 ES2015 Harmony import/export
        //   requireInclude: false, // 禁用 require.include
        //   requireEnsure: false, // 禁用 require.ensure
        //   requireContext: false, // 禁用 require.context
        //   browserify: false, // 禁用特殊处理的 browserify bundle
        //   requireJs: false, // 禁用 requirejs.*
        //   node: false, // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
        //   node: {...} // 在模块级别(module level)上重新配置 node 层(layer)
        // }
        
        // resourceQuery: /inline/, // foo.css?inline
        
        // test Rule.resource.test 的简写

        // use: [
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       importLoaders: 1
        //     }
        //   },
        //   {
        //     loader: 'less-loader',
        //     options: {
        //       noIeCompat: true
        //     }
        //   }
        // ]

        // 条件可以是这些之一：

        //   字符串：匹配输入必须以提供的字符串开始。是的。目录绝对路径或文件绝对路径。
        //   正则表达式：test 输入值。
        //   函数：调用输入的函数，必须返回一个真值(truthy value)以匹配。
        //   条件数组：至少一个匹配条件。
        //   对象：匹配所有属性。每个属性都有一个定义行为。
        //   { test: Condition }：匹配特定条件。一般是提供一个正则表达式或正则表达式的数组，但这不是强制的。
        //   { include: Condition }：匹配特定条件。一般是提供一个字符串或者字符串数组，但这不是强制的。
        //   { exclude: Condition }：排除特定条件。一般是提供一个字符串或字符串数组，但这不是强制的。
        //   { and: [Condition] }：必须匹配数组中的所有条件
        //   { or: [Condition] }：匹配数组中任何一个条件
        //   { not: [Condition] }：必须排除这个条件




        
      },

      // 处理css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]






  },
  resolve:{
    extensions: ['.js', '.jsx', '.json'],
  },
};