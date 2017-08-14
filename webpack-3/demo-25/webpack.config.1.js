var path = require('path');

module.exports = {
  //基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  context: __dirname, 
  
  // 单入口
  entry: './src/index.js',
  // entry: {   
  //   index: "./src/index.js",
  // },
  //多入口
  // entry: {   
  //   home: "./home.js",
  //   about: "./about.js",
  //   contact: "./contact.js"
  // },

  // entry: () => './demo',动态入口

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),

    //在和 output.library 和 output.libraryTarget 一起使用时，此选项允许用户向导出容器(export wrapper)中插入注释。要为 libraryTarget 每种类型都插入相同的注释，只需将 auxiliaryComment 设置为一个字符串
    library: "someLibName",
    libraryTarget: "umd",
    auxiliaryComment: "Test Comment",

    //libraryTarget 每种类型的注释进行更细粒度地控制，请传入一个对象
    // auxiliaryComment: { 
    //   root: "Root Comment",
    //   commonjs: "CommonJS Comment",
    //   commonjs2: "CommonJS2 Comment",
    //   amd: "AMD Comment"
    // }



  }
};

