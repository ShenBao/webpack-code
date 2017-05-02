# webpack-demo

## webpack

### 目标
- 根据需求，将依赖树拆分成块
- 初始化加载的时候尽可能少
- 将每一个静态资源看作是一个模块
- 容易将第三方库整合进来
- 可以自定义打包
- 适合大型项目

### 特点
- 代码拆分
- loader
- 智能解析
- 插件系统

### 安装
- 前置依赖nodejs,建议选择最新的版本
- webpack有1.x和2.x版本区别，使用有一些区别
- npm install -g webpack@1.12.x
- npm install webpack-dev-server --save-dev

### 参数介绍
- webpack  – for building once for development 开发环境
- webpack -p – for building once for production (minification) 生产环境
- webpack --watch – for continuous incremental build 监听编译
- webpack -d  – to include source maps 生产 map进行调试
- webpack --colors – for making things pretty 错误提示颜色友好处理


## webpack@1.x

### webpack.config.js

```webpack
module.exports = {
	entry:{
		'bundle':'./main.js',
		'bundle1':'./main1.js'
	},
	output:{
		path:__dirname +'/dist',
		filename:'[name].js'
	},
	module:{
		loaders:[{
			test://,
			loader:''
		}]
	},
    plugins: [

    ]
}
```

### get-started

[source case01](./webpack-1.x/case01)

```webpack
module.exports = {
	entry:{
		'bundle':'./main.js',
		'bundle1':'./main1.js'
	},
	output:{
		path:__dirname +'/dist',
		filename:'[name].js'
	}
}
```
命令行输入webpack-dev-server

若webpack.config.js配置文件名为config.js,那么执行webpack -dev-server -c config.js即可

### loader

loader介绍：https://webpack.github.io/docs/using-loaders.html

loader列表：https://webpack.github.io/docs/list-of-loaders.html

- babel的使用 [source case02](./webpack-1.x/case02)
- json的使用 [source case03](./webpack-1.x/case03)
- css的使用 [source case04](./webpack-1.x/case04)
- less的使用 [source case05](./webpack-1.x/case05)
- image的使用 [source case06](./webpack-1.x/case06)
- css module [source case07](./webpack-1.x/case07)

#### babel的使用 [source case02](./webpack-1.x/case02)
```webpack
module.exports = {

	entry:'./main.js',
	output:{
		filename:'./bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel',
				query: {
	          		presets: ['es2015']
	        	}
    		}
		]
	}
}
```
#### json的使用 [source case03](./webpack-1.x/case03)
```webpack
module.exports = {
	devtool: 'eval-source-map',
	entry:'./main.js',
	output:{
		filename:'./bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.json$/,
				loaders:['json']
			},
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel',
				query:{
					presets: ['es2015']
				}
			}
		]
	}
}
```
#### css的使用 [source case04](./webpack-1.x/case04)
```webpack
module.exports ={
	entry:'./main.js',
	output:{
		filename:'bundle.js'
	},
	module:{
		loaders:[{
			test:/\.css$/,
			loaders:["style","css"]
		}]
	}
}
```

loaders的写法总结:
- loader:'xxx!yyy'
- loader:'xxx-loader!yyy-loader'
- loaders:['xxx','yyy']

#### less的使用 [source case05](./webpack-1.x/case05)
```webpack
module.exports ={
	entry:'./main.js',
	output:{
		filename:'bundle.js'
	},
	module:{
		loaders:[{
			test:/\.less$/,
			loader:'style!css!less'
		}]
	}
}
```
#### image的使用 [source case06](./webpack-1.x/case07)
```webpack
module.exports = {
	entry:'./main.js',
	output:{
		filename:'bundle.js'
	},
	module:{
		loaders:[
		{
			test:/\.(jpg|png)/,
			loader:'url-loader?limit=8192'
		}]
	}
}
```
#### css module [source case07](./webpack-1.x/case07)
```webpack
module.exports = {
	entry:'./main.js',
	output:{
		filename:'bundle.js'
	},
	module:{
		loaders:[
		{
			test:/\.js$/,
			exclude:/node_modules/,
			loader:'babel',
			query:{
				presets:['es2015','stage-0']
			}
		},
		{
			test:/\.css$/,
			loader:'style!css?modules'
		}]
	}
}
```


### plugin

loader介绍：https://webpack.github.io/docs/using-plugins.html

loader列表：https://webpack.github.io/docs/list-of-plugins.html

- 压缩UglifyJs
- CommonsChunkPlugin
- 第三方 OpenBrowserPlugin

#### 压缩UglifyJs
```webpack

```
#### CommonsChunkPlugin
```webpack

```
#### 第三方 OpenBrowserPlugin
```webpack

```

### Code splitting


### Hot Module Replacement

































