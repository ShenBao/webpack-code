// console.log('hello');

// 使用行内loader有几种标识符 []
// -! 就是不使用preloader 和 normalLoader
// 排除掉其他的所有loader
// require('!!inlineLoader.js!./a.js')

// 这个文件只是这样处理 不在走规则
// require('!!style-loader!css-loader!./a.css')
//什么时候写成loader 把内容转化 ，什么时候写成plugin

class Animal {
  constructor(name){
    console.log(name);
  }
}
let animal = new Animal('小猫咪');

// file-loader 读取文件 发射一个新的文件 文件名 md5
// module.exports = 'sdfkfgasdasd.png'

// url-loader limit 如果超过限制 使用file-loader 小于限制使用base64

import logo from './logo.jpg'; // sdfkfgasdasd.png
let img = new Image();
img.src = logo;
document.body.appendChild(img);

require('./index.less');