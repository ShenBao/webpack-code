var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        use: 
          // [
          // 'style-loader',
          // {
          //   loader: "style-loader"
          // },
          // {
          //   loader: 'css-loader',
          //   options: {
          //     root: '.',// 解析 URL 的路径，以 / 开头的 URL 不会被转译
          //     url: true,// 启用/禁用 url() 处理;要禁用 css-loader 解析 url()，将选项设置为 false
          //     alias: {  // 创建别名更容易导入一些模块
          //       cssImg: './src/img'
          //     },
          //     import: false,// 启用/禁用 @import 处理
          //     modules: false,// 启用/禁用 CSS 模块
          //     minimize: false,// 启用/禁用 压缩  {Boolean|Object}
          //     sourceMap: true,// 启用/禁用 Sourcemap
          //     camelCase: false,// 以驼峰化式命名导出类名
          //     // importLoaders: 0,// 在 css-loader 前应用的 loader 的数量
          //     localIdentName: '[hash:base64]',//配置生成的标识符(ident)
          //     // localIdentName: '[path][name]__[local]--[hash:base64:5]'

          //     // 可以通过自定义 getLocalIdent 函数来指定绝对路径，以根据不同的模式(schema)生成类名
          //     getLocalIdent: (context, localIdentName, localName, options) => {
          //       return 'whatever_random_class_name'
          //     },

          //     camelCase: true, // 是否转换为驼峰
          //   }
          // }


          ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [ 'css-loader' ]
          }),

          // npm install --save-dev dynamic-css-loader
          // ExtractTextPlugin.extract({
          //   use: [ ... ],
          //   fallback: [
          //     'dynamic-css-loader',
          //     'file-loader',
          //     'extract-loader',
          //   ],
          // }),

        // ]
      },
      // =================================================================================================================

      // npm install --save-dev file-loader
      {
        test: /\.js$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][hash:10].[ext]',
                // [ext] 资源扩展名
                // [name] 资源的基本名称
                // [path] 资源相对于 context 查询参数或者配置的路径
                // [hash] 内容的哈希值，默认为十六进制编码的 md5
                // [<hashType>:hash:<digestType>:<length>] 可选配置
                // 其他的 hashType, 即 sha1, md5, sha256, sha512
                // 其他的 digestType, 即 hex, base26, base32, base36, base49, base52, base58, base62, base64
                // length 字符的长度
            context: '',
            publicPath: 'assets',
            outputPath: 'images',
            useRelativePath: false, 
            emitFile: true,
            limit: 10000,
            useRelativePath: process.env.NODE_ENV === "production"
          },
        },
      },

      // =================================================================================================================
      // npm install --save-dev gzip-loader
      {
        test: /\.gz$/,
        enforce: 'pre',
        use: 'gzip-loader'
      },

      // =================================================================================================================
      // npm i -D html-loader
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
            minimize: true,
            removeComments: false,
            collapseWhitespace: false,
          }
        }
      },

      // =================================================================================================================
      // npm i -D istanbul-instrumenter-loader
      // istanbul-instrumenter-loader 没看懂


      // =================================================================================================================
      // npm i jshint-loader --save
      {
        test: /\.js$/, // 涵盖 .js 文件
        enforce: "pre", // 预先加载好 jshint loader
        exclude: /node_modules/, // 排除掉 node_modules 文件夹下的所有文件
        use: [
            {
                loader: "jshint-loader"
            }
        ]
      },    //请注意下面的jshint 配置内容


      // =================================================================================================================
      // npm install --save-dev json-loader
      // ebpack >= v2.0.0 默认支持导入 JSON 文件
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      // npm install --save-dev json5-loader
      {
        // 使所有以 .json5 结尾的文件使用 `json5-loader`
        test: /\.json5$/,
        loader: 'json5-loader'
      },


      // =================================================================================================================

      // npm install --save-dev less-loader less
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
                sourceMap: true
            }
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              sourceMap: true,
              strictMath: true,
              noIeCompat: true,
              paths: [
                path.resolve(__dirname, "node_modules")
              ],
              plugins: [
                new CleanCSSPlugin({ advanced: true })
              ],
            }
          }
        ]
      },


      // const ExtractTextPlugin = require("extract-text-webpack-plugin");
      // {
      //   test: /\.less$/,
      //   use: extractLess.extract({
      //       use: [{
      //           loader: "css-loader"
      //       }, {
      //           loader: "less-loader"
      //       }],
      //       // use style-loader in development
      //       fallback: "style-loader"
      //   })
      // }


      // =================================================================================================================

      // npm install --save-dev mocha-loader
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },

      // =================================================================================================================
      // npm i multi-loader --save
      // 用法很简单  但是是何作用呢

      // =================================================================================================================
      // npm install --save-dev raw-loader

      {
        test: /\.txt$/,
        use: 'raw-loader'
      },

      // 使用 ：
      // import txt from 'file.txt';


      // =================================================================================================================

      // npm install sass-loader node-sass webpack --save-dev
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
        }, {
            loader: "css-loader",// 将 CSS 转化成 CommonJS 模块
            sourceMap: true //开发环境
        }, {
            loader: "sass-loader", // 将 Sass 编译成 CSS
            options: {
              includePaths: ["absolute/path/a", "absolute/path/b"]，
              sourceMap: true //开发环境
            }
        }]
      },

      // 生产环境
      // const ExtractTextPlugin = require("extract-text-webpack-plugin");
      // const extractSass = new ExtractTextPlugin({
      //     filename: "[name].[contenthash].css",
      //     disable: process.env.NODE_ENV === "development"
      // });

      // {
      //   test: /\.scss$/,
      //   use: extractSass.extract({
      //       use: [{
      //           loader: "css-loader"
      //       }, {
      //           loader: "sass-loader"
      //       }],
      //       // 在开发环境使用 style-loader
      //       fallback: "style-loader"
      //   })
      // }
      // plugins: [
      //     extractSass
      // ]

      // =================================================================================================================
      // npm i -D source-map-loader
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },


      // =================================================================================================================
      // npm install style-loader --save-dev

      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              base: 1000,
              attrs: { id: 'id' },
              sourceMap: true,   //开发环境
              convertToAbsoluteUrls: true
            } 
          },
          { loader: "css-loader" }
        ]
      },
      
      // =================================================================================================================
      // npm install svg-inline-loader --save-dev
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },

      // =================================================================================================================
      // npm install --save-dev thread-loader
      // npm i transform-loader --save
      // 高级技巧


      // =================================================================================================================
      // npm install --save-dev url-loader
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          mimetype: 'image/png',
          prefix: 'img'
        }
      }
      // =================================================================================================================
      
      // npm install val-loader --save-dev
      // npm i -D worker-loader

      // 高级用法  ？？

      // =================================================================================================================

      // npm install yaml-frontmatter-loader
      // var json = require("json-loader!yaml-frontmatter-loader!./file.md");
      // => 将 file.md 作为一个 javascript 对象返回
      // {
      //    test: /\.md$/,
      //    use: [ 'json-loader', 'yaml-frontmatter-loader' ]
      // }














    ]
  },
  jshint: {
    // 查询jslint配置项，请参考 http://www.jshint.com/docs/options/
    // 例如
    camelcase: true,

    //jslint 的错误信息在默认情况下会显示为 warning（警告）类信息
    //将 emitErrors 参数设置为true可使错误显示为error（错误）类信息
    emitErrors: false,

    //jshint默认情况下不会打断webpack编译
    //如果你想在jshint出现错误时，立刻停止编译
    //请设置failOnHint参数为true
    failOnHint: false,

    // 自定义报告函数
    reporter: function(errors) { }


    // [
    //   {
    //       id:        [字符串, 通常是 '(error)'],
    //       code:      [字符串, 错误/警告（error/warning）编码],
    //       reason:    [字符串, 错误/警告（error/warning）信息],
    //       evidence:  [字符串, 对应生成此错误的编码]
    //       line:      [数字]
    //       character: [数字]
    //       scope:     [字符串, 消息作用域;
    //                   通常是 '(main)' 除非代码被解析(eval)了]

    //       [+ 还有一些旧有的参数，一般用户不必了解]
    //   },
    //   // ...
    //   // 更多的错误/警告
    // ]


  },


  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new ExtractTextPlugin({
        filename: '[name].css'
      })
  ]
};