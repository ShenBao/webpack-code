var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [

      // =================================================================================================================
      // js
      // npm install --save-dev babel-loader babel-core babel-preset-env   
      // npm install babel-plugin-transform-runtime --save-dev
      // npm install babel-runtime --save
      // npm install --save-dev cache-loader
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            // 可以在  .babelrc中设置  参考https://babeljs.io/docs/usage/api/#options
            options: {  
              presets: ['env'],
              plugins: [
                'transform-runtime',
                // new webpack.ProvidePlugin({
                //     'Promise': 'bluebird'
                // }),
              ],
              cacheDirectory: true,//打包性能提升很明显
            }
          },
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.cache')
            }
          },
        ]
      },

      // =================================================================================================================
      /* css
        npm install --save-dev css-loader

        引用资源的合适 loader 是 file-loader 和 url-loader

      */
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          {
            loader: "style-loader"
          },
          {
            loader: 'css-loader',
            options: {
              root: '.',// 解析 URL 的路径，以 / 开头的 URL 不会被转译
              url: true,// 启用/禁用 url() 处理;要禁用 css-loader 解析 url()，将选项设置为 false
              alias: {  // 创建别名更容易导入一些模块
                cssImg: './src/img'
              },
              import: false,// 启用/禁用 @import 处理
              modules: false,// 启用/禁用 CSS 模块
              minimize: false,// 启用/禁用 压缩  {Boolean|Object}
              sourceMap: true,// 启用/禁用 Sourcemap
              camelCase: false,// 以驼峰化式命名导出类名
              // importLoaders: 0,// 在 css-loader 前应用的 loader 的数量
              localIdentName: '[hash:base64]',//配置生成的标识符(ident)
              // localIdentName: '[path][name]__[local]--[hash:base64:5]'

              // 可以通过自定义 getLocalIdent 函数来指定绝对路径，以根据不同的模式(schema)生成类名
              getLocalIdent: (context, localIdentName, localName, options) => {
                return 'whatever_random_class_name'
              }
            }
          }
        ]
      },
      // =================================================================================================================



    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
  ]
};