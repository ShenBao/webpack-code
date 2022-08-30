# 完整配置

参考网址：https://webpack.docschina.org/configuration/#options

```js
const path = require('path');

module.exports = {
  mode: "production", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: "./app/entry", // string | object | array
  // 默认为 ./src
  // 这里应用程序开始执行
  // webpack 开始打包
  output: {
    
  },
  module: {
    // 模块配置相关
    rules: [
      // 模块规则（配置 loader、解析器等选项）
      {
        // Conditions:
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        
      },
      {
        oneOf: [
          // ... (rules)
        ]
        // only use one of these nested rules
      },
      {
        // ... (conditions)
        rules: [
          // ... (rules)
        ]
        // use all of these nested rules (combine with conditions to be useful)
      },
    ],
    /* 高级模块配置（点击展示） */
  },
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving of loaders)
    modules: ["node_modules",path.resolve(__dirname, "app")],
    // directories where to look for modules (in order)
    extensions: [".js", ".json", ".jsx", ".css"],
    // 使用的扩展名
    alias: {
      
    },
    /* 可供选择的别名语法（点击展示） */
    /* 高级解析选项（点击展示） */
    /* Expert resolve configuration (click to show) */
  },
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 200000, // 整数类型（以字节为单位）
    maxEntrypointSize: 400000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: "source-map", // enum
  // 通过为浏览器调试工具提供极其详细的源映射的元信息来增强调试能力，
  // 但会牺牲构建速度。
  context: __dirname, // string（绝对路径！）
  // webpack 的主目录
  // entry 和 module.rules.loader 选项
  // 都相对于此目录解析
  target: "web", // 枚举
  // the environment in which the bundle should run
  // changes chunk loading behavior, available external modules
  // and generated code style
  externals: ["react", /^@angular/],
  // Don't follow/bundle these modules, but request them at runtime from the environment
  externalsType: "var", // (defaults to output.library.type)
  // Type of externals, when not specified inline in externals
  externalsPresets: { /* ... */ },
  // presets of externals
  ignoreWarnings: [/warning/],
  stats: "errors-only",
  stats: {
    // lets you precisely control what bundle information gets displayed
    preset: "errors-only",
    // A stats preset


    env: true,
    // include value of --env in the output
    outputPath: true,
    // include absolute output path in the output
    publicPath: true,
    // include public path in the output

    assets: true,
    // show list of assets in output

    entrypoints: true,
    // show entrypoints list
    chunkGroups: true,
    // show named chunk group list

    chunks: true,
    // show list of chunks in output

    modules: true,
    // show list of modules in output

    children: true,
    // show stats for child compilations

    logging: true,
    // show logging in output
    loggingDebug: /webpack/,
    // show debug type logging for some loggers
    loggingTrace: true,
    // show stack traces for warnings and errors in logging output

    warnings: true,
    // show warnings

    errors: true,
    // show errors
    errorDetails: true,
    // show details for errors
    errorStack: true,
    // show internal stack trace for errors
    moduleTrace: true,
    // show module trace for errors
    // (why was causing module referenced)

    builtAt: true,
    // show timestamp in summary
    errorsCount: true,
    // show errors count in summary
    warningsCount: true,
    // show warnings count in summary
    timings: true,
    // show build timing in summary
    version: true,
    // show webpack version in summary
    hash: true,
    // show build hash in summary
  },
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },
  experiments: {
    asyncWebAssembly: true,
    // WebAssembly as async module (Proposal)
    syncWebAssembly: true,
    // WebAssembly as sync module (deprecated)
    outputModule: true,
    // Allow to output ESM
    topLevelAwait: true,
    // Allow to use await on module evaluation (Proposal)
  },
  plugins: [
    // ...
  ],
  // list of additional plugins
  optimization: {
    chunkIds: "size",
    // method of generating ids for chunks
    moduleIds: "size",
    // method of generating ids for modules
    mangleExports: "size",
    // rename export names to shorter names
    minimize: true,
    // minimize the output files
    minimizer: [new CssMinimizer(), "..."],
    // minimizers to use for the output files

    splitChunks: {
      cacheGroups: {
        "my-name": {
          // define groups of modules with specific
          // caching behavior
          test: /\.sass$/,
          type: "css/mini-extract",

        }
      },

      fallbackCacheGroup: { /* Advanced (click to show) */ }
    }
  },
}
```
