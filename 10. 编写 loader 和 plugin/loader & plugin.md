# webpack loader & plugin

```js
resolve:{ // 第三方模块加载方式
  modules:[],
  mainFiles:
  mainFileds,
  alias,
  extensions
},
resolveLoader: {
    modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'loaders')
    ]
    // 别名的方式
    // alias:{
    //     "loader1":path.resolve(__dirname,'loader','loade1.js')
    // }
},
```

## loader 的分类

- loader 的分类有 pre{前置} post{后置} notrmal{正常}
- loader 的执行顺序 pre + normal + inline + post

## 加载 loader 的方式

1. 通过第三方模块
2. 写绝对路径来进行加载
3. resolveLoader alias modules
4. 通过 npm link 链接已有的 loader

## 手写 loader

源码 : [webpack-loader-plugin](https://github.com/ShenBao/webpack-demo/webpack-loader-plugin)

- file-loader
- url-loader

- babel-loader

- banner-loader

- style-loader
- css-loader
- less-loader

## 手写 plugin

源码 : [webpack-loader-plugin](https://github.com/ShenBao/webpack-demo/webpack-loader-plugin)

- FileListPlugin
- InlineSourcePlugin
- zipPlugin
