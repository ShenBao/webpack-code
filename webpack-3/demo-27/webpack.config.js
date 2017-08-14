const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");


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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
  ],
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



  // // 配置模块如何解析
  // resolve:{

  //   // 自动解析确定的扩展。
  //   extensions: ['.js', '.jsx', '.json'],

  //   // 创建 import 或 require 的别名
  //   alias: {
  //     css: path.resolve(__dirname, 'src/style/'),// 引用时可以用别名 import style from 'css/style.css';  参考https://doc.webpack-china.org/configuration/resolve/#resolve-alias

  //   },

  //   aliasFields: ["browser"],

  //   // 用于描述的 JSON 文件。
  //   descriptionFiles: ["package.json"], 

  //   //如果是 true，将不允许无扩展名(extension-less)文件。默认如果 ./foo 有 .js 扩展，require('./foo') 可以正常运行。
  //   enforceExtension: false, 

  //   //对模块是否需要使用的扩展（例如 loader）。
  //   enforceModuleExtension: false, 

  //   mainFields: ["browser", "module", "main"],//当 target 属性设置为 webworker, web 或者没有指定，默认值为：mainFields: ["browser", "module", "main"];对于其他任意的 target（包括 node），默认值为：mainFields: ["module", "main"]
  
  //   //解析目录时要使用的文件名
  //   mainFiles: ["index"],

  //   // 告诉 webpack 解析模块时应该搜索的目录。
  //   modules: ["node_modules"],
  //   // modules: [path.resolve(__dirname, "src"), "node_modules"],//如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索：

  //   // 启用，会主动缓存模块，但并不安全
  //   unsafeCache: true,
  //   // unsafeCache: /src\/utilities/,  //正则表达式，或正则表达式数组，可以用于匹配文件路径或只缓存某些模块。例如，只缓存 utilities 模块：

  //   // 应该使用的额外的解析插件列表
  //   plugins:  [new DirectoryNamedWebpackPlugin()],

  //   // 是否将符号链接(symlink)解析到它们的符号链接位置(symlink location)。默认：true
  //   symlinks: true,

  // },

  // 这组选项与上面的 resolve 对象的属性集合相同
  resolveLoader: {
      modules: ["node_modules"],
      extensions: [".js", ".json"],
      mainFields: ["loader", "main"],
      moduleExtensions: ['-loader'], //在解析模块（例如，loader）时尝试使用的扩展。默认是一个空数组。如果你想要不带 -loader 后缀使用 loader，你可以使用：
      
  },



};