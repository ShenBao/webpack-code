
const webpack = require('webpack');

const webpackConfig = require('./webpack.config.js');

const compiler = webpack(webpackConfig);


// compiler.run((err, stats) => {

// });


const watching = compiler.watch({
  /* watchOptions */
}, (err, stats) => {
  // 在这里打印 watch/build 结果...
//   console.log(stats);


    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
            return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings)
    }


    
    // if (err) {
    //     console.error(err);
    //     return;
    // }
    // console.log(stats.toString({
    //     chunks: false,  // 使构建过程更静默无输出
    //     colors: true    // 在控制台展示颜色
    // }));
});





// 关闭 
// watching.close(() => {
//   console.log("Watching Ended.");
// });

// 作废
// watching.invalidate();


// stats.hasErrors()
// 可以用来检查编译期是否有错误，返回 true 或 false。

// stats.hasWarnings()
// 可以用来检查编译期是否有警告，返回 true 或 false。

// stats.toJson(options)
// 以 JSON 对象形式返回编译信息。

// stats.toString(options)
// 以格式化的字符串形式返回描述编译信息（类似 CLI 的输出）。












