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

##  webpack loaders

在配置 JSX 的过程中，使用到了 loader， 前面已经介绍过 webpack 的核心功能包含 loader，通过 loader 可以将任意资源转化为 javascript 模块。

### loader 定义

> Loaders are transformations that are applied on a resource file of your app.
> (Loaders 是应用中源码文件的编译转换器)



也就是说在 webpack 中，通过 loader 可以实现 JSX 、Es6、CoffeeScript 等的转换，

### loader 功能

1. loader 管道：在同一种类型的源文件上，可以同时执行多个 loader ， loader 的执行方式可以类似管道的方式，管道执行的方向为从右到左。
2. loader 可以支持同步和异步
3. loader 可以接收配置参数
4. loader 可以通过正则表达式或者文件后缀指定特定类型的源文件
5. 插件可以提供给 loader 更多功能
6. loader 除了做文件转换以外，还可以创建额外的文件

### loader 配置

新增 loader 可以在 webpack.config.js 的 `module.loaders` 数组中新增一个 loader 配置。

一个 loader 的配置为：

```javascript
{
    // 通过扩展名称和正则表达式来匹配资源文件
    test: String ,          
    // 匹配到的资源会应用 loader， loader 可以为 string 也可以为数组
    loader: String | Array
}
```

感叹号和数组可以定义 loader 管道:

```javascript
{
    module: {
        loaders: [
            { test: /\.jade$/, loader: "jade" },
            // => .jade 文件应用  "jade" loader  

            { test: /\.css$/, loader: "style!css" },
            { test: /\.css$/, loaders: ["style", "css"] },
            // => .css 文件应用  "style" 和 "css" loader  
        ]
    }
}
```

loader 可以配置参数

```javascript
{
    module: {
        loaders: [
            // => url-loader 配置  mimetype=image/png 参数
            { 
                test: /\.png$/, 
                loader: "url-loader?mimetype=image/png" 
            }, {
                test: /\.png$/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            }

        ]
    }
}
```

### 使用 loader

#### 第一步: 安装

loader 和 webpack 一样都是 Node.js 实现，发布到 npm 当中，需要使用 loader 的时候，只需要 

```shell
$ npm install xx-loader --save-dev

// eg css loader
$ npm install css-loader style-loader --save-dev
```

#### 第二步：修改配置

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
        }, {
            test: /\.css$/, 
            loader: "style-loader!css-loader" 
        }]
    }
}
```

#### 第三步：使用

前面我们已经使用过 jsx loader 了， loader 的使用方式有多种

1. 在配置文件中配置
2. 显示的通过 require 调用
3. 命令行调用

> 显示的调用 require 会增加模块的耦合度，应尽量避免这种方式

以 css-loader 为例子，在项目 src 下面创建一个 css

src/style.css

```css
body {
    background: red;
    color: white;
}
```

修改 webpack 配置 entry 添加 

```javascript
entry: {
    index: ['./src/index.js', './src/style.css']
}
```

执行 webpack 命令然后打开 index.html 会看到页面背景被改为红色。

最终的编译结果为：

```javascript
....
function(module, exports, __webpack_require__) {
    exports = module.exports = __webpack_require__(171)();
    exports.push([module.id, "\nbody {\n background: red;\n color: white;\n}\n", ""]);
}
....
```

可以看到 css 被转化为了 javascript, 在页面中并非调用 `<link rel="stylesheet" href="">` 的方式， 而是使用 inline 的 `<style>.....</style>` 

另外一种方法是直接 require， 修改 src/index.js:

```javascript
var css = require("css!./style.css");
```

编译结果相同。


## webpack 开发环境与生产环境

前端开发环境通常分为两种，开发环境和生成环境，在开发环境中，可能我们需要日志输出，sourcemap ，错误报告等功能，在生成环境中，需要做代码压缩，hash 值生成。两种环境在其他的一些配置上也可能不同。 

所以为了区分，我们可以创建两个文件：

- webpack.config.js      // 开发环境
- webpack.config.prod.js // 生产环境

生产环境 build 用如下命令：

```shell
webpack --config webpack.config.prod.js
```

在本章深入 webpack 小节中会更多的介绍生产环境中的优化

## webpack 插件

webpack 提供插件机制，可以对每次 build 的结果进行处理。配置 plugin 的方法为在 webpack.config.js 中添加：

```javascript
{
  plugins: [
   new BellOnBundlerErrorPlugin()
  ]
}
```

plugin 也是一个 npm 模块，安装一个 plugin ：

```shell
$ npm install bell-on-bundler-error-plugin --save-dev 
```

## webpack 分割 vendor 代码和应用业务代码

在上面的 jsx 配置中，我们将 React 和 ReactDOM 一起打包进了项目代码。为了实现业务代码和第三方代码的分离，我们可以利用 
CommonsChunkPlugin 插件.

修改 webpack.config.js

```javascript
{
    entry: {
        index: './src/index.js',
        a: './src/a.js',
        // 第三方包
        vendor: [
          'react',
          'react-dom'
        ]
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
        }, {
            test: /\.css$/, 
            loader: "style-loader!css-loader" 
        }]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
}
```

执行 webpack 命令，输出日志：

```shell
Hash: f1256dc00b9d4bde8f7f
Version: webpack 1.13.1
Time: 1459ms
           Asset       Size  Chunks             Chunk Names
            a.js  109 bytes       0  [emitted]  a
        index.js    10.9 kB       1  [emitted]  index
vendor.bundle.js     702 kB       2  [emitted]  vendor
   [0] multi vendor 40 bytes {2} [built]
   [0] multi index 40 bytes {1} [built]
    + 173 hidden modules
```

index.js 体积变小了，多出了 vendor.bundle.js 

























