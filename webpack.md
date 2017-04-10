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


## webpack 支持 Jsx 

现在我们已经可以使用 webpack 来打包基于 CommonJs 的 Javascript 模块了，但是还没法解析 JSX 语法和 Es6 语法。下面我们将利用 Babel 让 webpack 能够解析 Es6 和 Babel

### 第一步：npm install 依赖模块

```shell
// babel 相关的模块
$ npm install babel-loader babel-preset-es2015 babel-preset-stage-0 babel-preset-react babel-polyfill --save-dev

// react 相关的模块
$ npm install react react-dom --save
```

### 第二步：webpack.config.js 中添加 babel loader 配置

```javascript
{
    entry: {
        index: './src/index.js',
        a: './src/a.js'
    },
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }]
    }
}
```

### 第三步: 修改 index.js 为 React 的语法

src/index.js 内容改为:

> Es6 的知识在后面的章节中讲解，目前我们暂时以 Es5 的方式来写，但是配置已经支持了 Es6 的编译，熟悉 Es6 的读者也可以直接写 Es6

```html
// 通过 require 的方式依赖 React，ReactDOM
var React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass({
  render: function render() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById('AppRoot')
);
```

### 第四步：运行 webpack

```shell
$ webpack
```





























