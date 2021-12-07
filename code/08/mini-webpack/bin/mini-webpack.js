#! /usr/bin/env node

// 1) 需要找到当前执行名的路径 拿到webpack.config.js

let path = require('path');

// // config配置文件
let config = require(path.resolve('webpack.config.js'));

let Compiler = require('../lib/Compiler.js')
let compiler = new Compiler(config);
compiler.hooks.entryOption.call();
// 标识运行编译
compiler.run();
