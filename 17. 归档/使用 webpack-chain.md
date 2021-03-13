# webpack-chain

- [webpack-chain](https://github.com/neutrinojs/webpack-chain)
- [webpack-chain 中文文档](https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans)

webpack-chain 是什么？

Webpack 的流式配置方案 —— webpack-chain

## 使用

npm install --save-dev webpack-chain

## 修改 entry 和 output

```js
chainWebpack: (config) => {
  config.entryPoints.clear(); // 会把默认的入口清空
  config.entry('main').add('./src/main.js'); //新增入口
  config.entry('routes').add('./src/app-routes.js'); //新增入口

  config.output
    .path('dist')
    .filename('[name].[chunkhash].js')
    .chunkFilename('chunks/[name].[chunkhash].js')
    .libraryTarget('umd')
    .library();
};

// 其他的output配置
config.output
  .auxiliaryComment(auxiliaryComment)
  .chunkFilename(chunkFilename)
  .chunkLoadTimeout(chunkLoadTimeout)
  .crossOriginLoading(crossOriginLoading)
  .devtoolFallbackModuleFilenameTemplate(devtoolFallbackModuleFilenameTemplate)
  .devtoolLineToLine(devtoolLineToLine)
  .devtoolModuleFilenameTemplate(devtoolModuleFilenameTemplate)
  .filename(filename)
  .hashFunction(hashFunction)
  .hashDigest(hashDigest)
  .hashDigestLength(hashDigestLength)
  .hashSalt(hashSalt)
  .hotUpdateChunkFilename(hotUpdateChunkFilename)
  .hotUpdateFunction(hotUpdateFunction)
  .hotUpdateMainFilename(hotUpdateMainFilename)
  .jsonpFunction(jsonpFunction)
  .library(library)
  .libraryExport(libraryExport)
  .libraryTarget(libraryTarget)
  .path(path)
  .pathinfo(pathinfo)
  .publicPath(publicPath)
  .sourceMapFilename(sourceMapFilename)
  .sourcePrefix(sourcePrefix)
  .strictModuleExceptionHandling(strictModuleExceptionHandling)
  .umdNamedDefine(umdNamedDefine);
```

## 设置别名 alias

```js
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'))
      .delete('base'); // 删掉指定的别名
    // .clear()  会把全部别名都删掉
  },
};
```

## 修改代理 proxy

```js
chainWebpack: (config) => {
  config.devServer
    .port(8888)
    .open(true)
    .proxy({
      '/dev': {
        target: 'http://123.57.153.106:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': '',
        },
      },
    });
};
// chain其余队proxy的配置
config.devServer
  .bonjour(bonjour)
  .clientLogLevel(clientLogLevel)
  .color(color)
  .compress(compress)
  .contentBase(contentBase)
  .disableHostCheck(disableHostCheck)
  .filename(filename)
  .headers(headers)
  .historyApiFallback(historyApiFallback)
  .host(host)
  .hot(hot)
  .hotOnly(hotOnly)
  .https(https)
  .inline(inline)
  .info(info)
  .lazy(lazy)
  .noInfo(noInfo)
  .open(open)
  .openPage(openPage)
  .overlay(overlay)
  .pfx(pfx)
  .pfxPassphrase(pfxPassphrase)
  .port(port)
  .progress(progress)
  .proxy(proxy)
  .public(public)
  .publicPath(publicPath)
  .quiet(quiet)
  .setup(setup)
  .socket(socket)
  .staticOptions(staticOptions)
  .stats(stats)
  .stdin(stdin)
  .useLocalIp(useLocalIp)
  .watchContentBase(watchContentBase)
  .watchOptions(watchOptions);
```

## 添加插件及修改插件参数

添加插件：

```js
// 添加API
config
  .plugin(name)
  .use(WebpackPlugin, args)

// 一个例子
const fileManager = require("filemanager-webpack-plugin");
...
//注意：use部分，不能使用new的方式建立插件实例
webpackConfig.plugin("zip").use(fileManager, [
    {
      onEnd: {
        archive: [
          {
            source: "dist",
            destination: zipName
          }
        ]
      }
    }
  ]);
```

修改插件参数 react：

```js
// 可使用 tap方式，修改插件参数
config.plugin(name).tap((args) => newArgs);

// 一个例子
config
  .plugin('env')
  //使用tag修改参数
  .tap((args) => [...args, 'SECRET_KEY']);
```

## 修改插件初始化及移除插件

修改插件初始化 webpack

```js
config.plugin(name).init((Plugin, args) => new Plugin(...args));
```

移除插件：

```js
chainWebpack: (config) => {
  config.plugins.delete('prefetch');
  // 移除 preload 插件
  config.plugins.delete('preload');
};
```

## 在 xx 插件前调用/在 xx 插件以后调用

有时候须要 xx 插件在 aa 插件以前调用。

```js
onfig.plugin(name).before(otherName);

// 一个例子：ScriptExtWebpackPlugin插件在HtmlWebpackTemplate插件前调用

config
  .plugin('html-template')
  .use(HtmlWebpackTemplate)
  .end()
  .plugin('script-ext')
  .use(ScriptExtWebpackPlugin)
  .before('html-template');
```

有时候须要 xx 插件在 aa 插件以后调用。

```js
config.plugin(name).after(otherName);

// 一个例子html-template在script-ext以后调用

config
  .plugin('html-template')
  .after('script-ext')
  .use(HtmlWebpackTemplate)
  .end()
  .plugin('script-ext')
  .use(ScriptExtWebpackPlugin);
```

## performance 性能

```js
config.performance
  .hints(hints) //false | "error" | "warning"。打开/关闭提示
  .maxEntrypointSize(maxEntrypointSize) //入口起点表示针对指定的入口，对于全部资源，要充分利用初始加载时(initial load time)期间。此选项根据入口起点的最大致积，控制 webpack 什么时候生成性能提示。默认值是：250000
  .maxAssetSize(maxAssetSize) //资源(asset)是从 webpack 生成的任何文件。此选项根据单个资源体积，控制 webpack 什么时候生成性能提示。默认值是：250000
  .assetFilter(assetFilter); //此属性容许 webpack 控制用于计算性能提示的文件
```

## 代码分割及性能优化 optimizations

```js
config.optimization
  .concatenateModules(concatenateModules)
  .flagIncludedChunks(flagIncludedChunks)
  .mergeDuplicateChunks(mergeDuplicateChunks)
  .minimize(minimize) //boolean，默认为true,是否开启压缩
  .namedChunks(namedChunks)
  .namedModules(namedModules)
  .nodeEnv(nodeEnv)
  .noEmitOnErrors(noEmitOnErrors)
  .occurrenceOrder(occurrenceOrder)
  .portableRecords(portableRecords)
  .providedExports(providedExports)
  .removeAvailableModules(removeAvailableModules)
  .removeEmptyChunks(removeEmptyChunks)
  .runtimeChunk(runtimeChunk)
  .sideEffects(sideEffects)
  .splitChunks(splitChunks) //object:代码分割。默认状况下，webpack v4 +为动态导入的模块提供了开箱即用的新通用块策略。
  .usedExports(usedExports);

//举个例子

config.optimization.splitChunks({
  chunks: 'async', // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
  minSize: 30000, // 最小尺寸，30000
  minChunks: 1, // 最小 chunk ，默认1
  maxAsyncRequests: 5, // 最大异步请求数， 默认5
  maxInitialRequests: 3, // 最大初始化请求书，默认3
  automaticNameDelimiter: '~', // 打包分隔符
  name: function () {}, // 打包后的名称，此选项可接收 function
  cacheGroups: {
    // 这里开始设置缓存的 chunks
    priority: 0, // 缓存组优先级
    vendor: {
      // key 为entry中定义的 入口名称
      chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是async)
      test: /react|lodash/, // 正则规则验证，若是符合就提取 chunk
      name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
      minSize: 30000,
      minChunks: 1,
      enforce: true,
      maxAsyncRequests: 5, // 最大异步请求数， 默认1
      maxInitialRequests: 3, // 最大初始化请求书，默认1
      reuseExistingChunk: true, // 可设置是否重用该chunk
    },
  },
});
```

## 自定义代码压缩工具

webpack4.x 默认使用的 TerserPlugin 作代码压缩。

```js
//使用
config.optimization.minimizer.use(WebpackPlugin, args);
//删除
config.optimization.minimizers.delete(name);

// 一个例子

config.optimization
  .minimizer('css')
  .use(OptimizeCSSAssetsPlugin, [{cssProcessorOptions: {safe: true}}]);

// Minimizer plugins can also be specified by their path, allowing the expensive require()s to be
// skipped in cases where the plugin or webpack configuration won't end up being used.
config.optimization
  .minimizer('css')
  .use(require.resolve('optimize-css-assets-webpack-plugin'), [
    {cssProcessorOptions: {safe: true}},
  ]);

//是要tap修改插件参数
config.optimization
  .minimizer('css')
  .tap((args) => [...args, {cssProcessorOptions: {safe: false}}]);
```

## 添加一个新的 Loader

```js
config.module
  .rule(name)
    .use(name)
      .loader(loader)
      .options(options)

// 一个例子

 config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
// 若是是非webpack-chain的话
module:{
  rules:[
    {
      test:/\.graphql$/,
      use::[
        {
          loader:"graphql-tag/loader"
        }
      ]
    }
  ]
}
```

## 修改 Loader

```js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        // 修改它的选项...
        return options;
      });
  },
};
```

注意 对于 CSS 相关 loader 来讲，咱们推荐使用 css.loaderOptions 而不是直接链式指定 loader。这是由于每种 CSS 文件类型都有多个规则，而 css.loaderOptions 能够确保你经过一个地方影响全部的规则。

## 替换一个规则里的 Loader

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    // 清除已有的全部 loader。
    // 若是你不这样作，接下来的 loader 会附加在该规则现有的 loader 以后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
};
```

## 使用 when 作条件配置

```js
consif.when(condition, truthyFunc, falsyFunc);

// 一个例子，当构建生产包时添加minify插件，不然设置构建类型为source-map
// devtool请见：https://www.webpackjs.com/configuration/devtool/
config.when(
  process.env.NODE_ENV === 'production',
  (config) => config.plugin('minify').use(BabiliWebpackPlugin),
  (config) => config.devtool('source-map')
);
```

## 使用 toString()查看 chain 对应的 webpack 配置

```js
config
  .module
    .rule('compile')
      .test(/\.js$/)
      .use('babel')
        .loader('babel-loader');

config.toString();

/*
{
  module: {
    rules: [
      /* config.module.rule('compile') */
      {
        test: /\.js$/,
        use: [
          /* config.module.rule('compile').use('babel') */
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
*/
```

## 链接

- [一步一步的了解 webpack4 的 splitChunk 插件](https://juejin.cn/post/6844903614759043079)

- https://github.com/wangxingkang/webpack-chain-study/blob/master/examples/auto-css-modules/build/webpack.config.ts
- https://github.com/yxy199399/webpackChain/blob/master/webpack.config.js
