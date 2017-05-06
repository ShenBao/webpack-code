
// module: {
//     loaders: [{
//       test: /\.js$/,
//       exclude: /node_modules/,
//       include: __dirname,
//       loader: 'babel'
//     }]
//   }

// # 使用全局变量
// externals: {
// 	// var $ = require('jquery') 等于 var $ = window.jQuery
// 	'jquery': 'jQuery',
// 	// var _ = require('underscore') 等于 var _ = window._
// 	'underscore': '_'
// }


// # 暴露全局变量

// > 有些模块依赖全局变量 `windows.jQuery` 才能使用，可以通过 [expose-loader](https://github.com/webpack/expose-loader) 暴露全局变量

// ```shell
// npm install jquery --save
// npm install expose-loader -D
// ```

// ```shell
// webpack -w
// ```

// module: {
//         loaders: [
//             {
//                 test: require.resolve('jquery'),
//                 loader: 'expose?jQuery!expose?$'
//             }
//         ]
//     }


// 单独编译css
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// extract-text-webpack-plugin

// module: {
// 	loaders: [
// 		// Extract css files
// 		{
// 			test: /\.css$/,
// 			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
// 		}
// 	]
// },
// plugins: [
// 	new ExtractTextPlugin("[name].b.css", {
// 		allChunks: true
// 	})
// 	,
// 	// 压缩代码
// 	new webpack.optimize.UglifyJsPlugin()
// ]


自动打包公用资源

```shell
npm install jquery paging --save
```

```shell
webpack -w
```

var webpack = require('webpack')
// CommonsChunkPlugin 会分析所有入口文件共同依赖的js,并将他们存放在 common.b.js 。
// 这样在页面单独引用 common.b.js  index b c 入口都存在 jquery, comomn.b.js 中会存在 jquery,可以看看 common.b.js 的代码
var chunk = new webpack.optimize.CommonsChunkPlugin("common.b.js")
module.exports = {
    entry: {
        'index': './index.js',
        'b': './b.js',
        'c': './c.js'
    },
    output: {
        path: './',
        filename: "[name].b.js"
    },
    plugins: [
        chunk
    ]
};