# webpack


# webpack使用

## 命令行调用

```
webpack src/index.js dist/index.js
```

## 配置文件

```
var webpack = require('webpack')
module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist/',
    filename: 'index.js'
  }
}
```





































