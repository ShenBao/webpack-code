
var path = require("path");

//引入glob
var glob = require('glob')
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entryJsPath = './src/entryjs/';
var htmlPath = './src/html/';
var faviconPath = './src/favicon/';

//entries函数
var entries= function () {
    var entryFiles = glob.sync(entryJsPath + '*.js')
    var map = {};
    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
}

//html_webpack_plugins 定义
var html_plugins = function () {
    var entryHtml = glob.sync(htmlPath + '*.html');
    var r = []
    var entriesFiles = entries();
    for (var i = 0; i < entryHtml.length; i++) {
        var filePath = entryHtml[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        var conf = {
            template: filePath,
            filename: filename + '.html',
            favicon: faviconPath + filename + '.ico',
        }
        //如果和入口js文件同名
        if (filename in entriesFiles) {
            conf.inject = 'body'
            conf.chunks = ['vendor', filename]
        }
        //跨页面引用，如pageA,pageB 共同引用了common-a-b.js，那么可以在这单独处理
        //if(pageA|pageB.test(filename)) conf.chunks.splice(1,0,'common-a-b')
        r.push(new HtmlWebpackPlugin(conf))
    }
    return r;
}

console.log(html_plugins())

module.exports = {
    entry: entries(),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
    },
    plugins: html_plugins()
}