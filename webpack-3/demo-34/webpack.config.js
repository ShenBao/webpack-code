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

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {  
              presets: ['env'],
              plugins: [
                'transform-runtime',
              ],
              cacheDirectory: true,//打包性能提升很明显
            }
          },
        ]
      },

      {
        test: /\.css$/,
        use: 
          ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [ 'css-loader' ]
          }),
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new ExtractTextPlugin({
        filename: '[name].css'
    }),
    // =============================================================================================================

    // 通过合并小于 minChunkSize 大小的 chunk，将 chunk 体积保持在指定大小限制以上。
    new webpack.optimize.MinChunkSizePlugin(
      {
        minChunkSize: 10000 // Minimum number of characters
      }
    ),

    // =============================================================================================================

    new webpack.optimize.AggressiveSplittingPlugin(
      {
        minSize: 30000, //Byte, split point. Default: 30720
        maxSize: 50000, //Byte, maxsize of per file. Default: 51200
        chunkOverhead: 0, //Default: 0
        entryChunkMultiplicator: 1, //Default: 1
      }
    ),
    // =============================================================================================================
    // npm install babili-webpack-plugin --save-dev
    // const BabiliPlugin = require("babili-webpack-plugin");
    new BabiliPlugin(babiliOptions, overrides),
      // babiliOptions
      //   babiliOptions会被传递到babili preset。可以查阅 https://github.com/babel/babili/tree/master/packages/babel-preset-babili#options. Default: {}。

      // Overrides
      //   test: JS文件拓展名正则表达式。 默认： /\.js($|\?)/i
      //   comments: 保留注释。 默认： /@preserve|@licen(s|c)e/。使用假值来移除所有的注释。接收函数，具有test（正则）属性的对象，以及值这几种类型。
      //   sourceMap: 默认：使用 webpackConfig.devtool。通过这个设置来重写。
      //   parserOpts: 配置具有特殊 parser 选项的 babel。
      //   babel: 通过自定义babel-core代替。 require("babel-core")
      //   babili: 通过自定义babili preset来代替。 require("babel-preset-babili").

    // =============================================================================================================
    new webpack.BannerPlugin(banner),
    // or
    new webpack.BannerPlugin(options),

        // {
        //   banner: string, // 其值为字符串，将作为注释存在
        //   raw: boolean, // 如果值为 true，将直出，不会被作为注释
        //   entryOnly: boolean, // 如果值为 true，将只在入口 chunks 文件中添加
        //   test: string | RegExp | Array,
        //   include: string | RegExp | Array,
        //   exclude: string | RegExp | Array,
        // }
          // banner: "hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]"

    // =============================================================================================================
    // new webpack.optimize.CommonsChunkPlugin(options),  具体参考 https://doc.webpack-china.org/plugins/commons-chunk-plugin/
    // {
      //   name: string, // or
      //   names: string[],
      //   // 这是 common chunk 的名称。已经存在的 chunk 可以通过传入一个已存在的 chunk 名称而被选择。
      //   // 如果一个字符串数组被传入，这相当于插件针对每个 chunk 名被多次调用
      //   // 如果该选项被忽略，同时 `options.async` 或者 `options.children` 被设置，所有的 chunk 都会被使用，
      //   // 否则 `options.filename` 会用于作为 chunk 名。
      //   // When using `options.async` to create common chunks from other async chunks you must specify an entry-point
      //   // chunk name here instead of omitting the `option.name`.

      //   filename: string,
      //   // common chunk 的文件名模板。可以包含与 `output.filename` 相同的占位符。
      //   // 如果被忽略，原本的文件名不会被修改(通常是 `output.filename` 或者 `output.chunkFilename`)。
      //   // This option is not permitted if you're using `options.async` as well, see below for more details.

      //   minChunks: number|Infinity|function(module, count) -> boolean,
      //   // 在传入  公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
      //   // 数量必须大于等于2，或者少于等于 chunks的数量
      //   // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
      //   // 你可以传入一个 `function` ，以添加定制的逻辑（默认是 chunk 的数量）

      //   chunks: string[],
      //   // 通过 chunk name 去选择 chunks 的来源。chunk 必须是  公共chunk 的子模块。
      //   // 如果被忽略，所有的，所有的 入口chunk (entry chunk) 都会被选择。


      //   children: boolean,
      //   // 如果设置为 `true`，所有  公共chunk 的子模块都会被选择

      //   async: boolean|string,
      //   // 如果设置为 `true`，一个异步的  公共chunk 会作为 `options.name` 的子模块，和 `options.chunks` 的兄弟模块被创建。
      //   // 它会与 `options.chunks` 并行被加载。
      //   // Instead of using `option.filename`, it is possible to change the name of the output file by providing
      //   // the desired string here instead of `true`.

      //   minSize: number,
      //   // 在 公共chunk 被创建立之前，所有 公共模块 (common module) 的最少大小。
      // }

    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",   //    对应 entry中 commons: ["jquery", "other-lib"],
      // ( 公共chunk(commnons chunk) 的名称)

      filename: "commons.js",
      // ( 公共chunk 的文件名)

      // minChunks: 3,
      // (模块必须被3个 入口chunk 共享)
      // minChunks: Infinity,

      // chunks: ["pageA", "pageB"],
      // (只使用这些 入口chunk)
    }),
      

    // =============================================================================================================
    // npm i -D compression-webpack-plugin
    // new CompressionPlugin({
    //     asset: "[path].gz[query]",
    //     algorithm: "gzip",
    //     test: /\.(js|html)$/,
    //     threshold: 10240,
    //     minRatio: 0.8
    // })

        // asset： 目标资源名称。 [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
        // filename: A function(asset) which receives the asset name (after processing asset option) and returns the new asset name. Defaults to false.
        // algorithm： 可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
        // test： 所有匹配该正则的资源都会被处理。默认值是全部资源。
        // threshold： 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
        // minRatio： 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
        // deleteOriginalAssets: Whether to delete the original assets or not. Defaults to false.


    // =============================================================================================================

      // DefinePlugin 允许创建一个在编译时可以配置的全局常量

      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        VERSION: JSON.stringify("5fa3b9"),
        BROWSER_SUPPORTS_HTML5: true,
        TWO: "1+1",
      }),

      // 应用
      // if (!PRODUCTION) {
      //   console.log('Debug info')
      // }

      // if (PRODUCTION) {
      //   console.log('Production log')
      // }

        
    // =============================================================================================================

    // DLLPlugin 和 DLLReferencePlugin 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。
    // EnvironmentPlugin 是一个通过 DefinePlugin 来设置 process.env 环境变量的快捷方式。
    // ExtractTextWebpackPlugin  抽取css

    // =============================================================================================================
      
    // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境
    //   new webpack.HashedModuleIdsPlugin({
    //     // 参数...
    //   })
    // hashFunction: 散列算法，默认为 'md5'。支持 Node.JS crypto.createHash 的所有功能。
    // hashDigest: 在生成 hash 时使用的编码方式，默认为 'base64'。支持 Node.js hash.digest 的所有编码。
    // hashDigestLength: 散列摘要的前缀长度，默认为 4。

      new webpack.HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20
      }),

    // =============================================================================================================
    // 模块热替换插件(HotModuleReplacementPlugin)
    // 永远不要在生产环境(production)下启用 HMR
      new webpack.HotModuleReplacementPlugin({
        // Options...
      }),
      // multiStep (boolean)：设置为 true 时，插件会分成两步构建文件。首先编译热加载 chunks，之后再编译剩余的通常的资源。
      // fullBuildTimeout (number)：当 multiStep 启用时，表示两步构建之间的延时。
      // requestTimeout (number)：下载 manifest 的延时（webpack 3.0.0 后的版本支持）。


    // =============================================================================================================
      // 合并chunk
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5, // 必须大于或等于 1
        minChunkSize: 1000
      }),
    // =============================================================================================================
      // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
      new webpack.NamedModulesPlugin(),
    // =============================================================================================================
      // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。对于所有资源，统计资料(stat)的 emitted 标识都是 false。
      new webpack.NoEmitOnErrorsPlugin(),

    // =============================================================================================================
      // NormalModuleReplacementPlugin
      // 高级用法？？
    
    // NpmInstallWebpackPlugin  自动安装模块二

    // =============================================================================================================
      //自动加载模块，而不必到处 import 或 require 。
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),


    // =============================================================================================================
      // const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

      new UglifyJSPlugin()

      // 这个重要


    // =============================================================================================================
    // WatchIgnorePlugin   无视指定的文件。换句话说，当处于监视模式(watch mode)下，符合给定地址的文件或者满足给定正则表达式的文件的改动不会触发重编译。
    // ZopfliWebpackPlugin





  ]
};