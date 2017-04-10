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


# webpack 配置

## entry 和 output

webpack 的配置中主要的两个配置 key 是，entry 和 output。
```
{
    entry: [String | Array | Object], // 入口模块
    output: {
        path: String,      // 输出路径
        filename: String   // 输出名称或名称 pattern
        publicPath: String // 指定静态资源的位置
        ...                // 其他配置
    }
}
```
### 单一入口

如果只有一个入口文件，可以有如下几种配置方式

```javascript
// 第一种 String 
{
  entry: './src/index.js',
  output: {
    path: './dist/',
    filename: 'index.js'
  }
}

// 第二种 Array 
{
  entry: ['./src/index.js'],
  output: {
    path: './dist/',
    filename: 'index.js'
  }
}

// 第三种 Object
{
  entry: {
    index: './src/index.js',
  },
  output: {
    path: './dist/',
    filename: 'index.js'
  }
}
```

### 多个入口文件

当存在多个入口时 ，可以使用 Array 的方式，比如依赖第三方库 bootstrap ，最终 bootstrap 会被追加到打包好的 index.js 中，数组中的最后一个会被 export。

```javascript
{
  entry: ['./src/index.js', './vendor/bootstrap.min.js'],
  output: {
    path: './dist',
    filename: "index.js"
  }
}
```
### 多个打包目标

上面的例子中都是打包出一个 index.js 文件，如果项目有多个页面，那么需要打包出多个文件，webpack 可以用对象的方式配置多个打包文件

```javascript
{
  entry: {
    index: './src/index.js',
    a: './src/a.js'
  },
  output: {
    path: './dist/',
    filename: '[name].js' 
  }
}
```

最终会打包出：

```shell
.
├── a.js
└── index.js
```

**文件名称 pattern**

- `[name]` entry 对应的名称
- `[hash]` webpack 命令执行结果显示的 Hash 值
- `[chunkhash]` chunk 的 hash

为了让编译的结果名称是唯一的，可以利用 hash 。
































