# Module Federation 模块联邦

## 模块联邦是什么

> ## [动机](https://webpack.docschina.org/concepts/module-federation/#motivation)
>
> 多个独立的构建可以组成一个应用程序，这些独立的构建之间不应该存在依赖关系，因此可以单独开发和部署它们。
>
> 这通常被称作微前端，但并不仅限于此。

这是 webpack 官网中对该功能的动机的解释，简单来说就是允许一个应用中动态地去加载和引入另一个应用的代码。

## 怎么使用模块联邦

我们现在有两个应用 `host` 和 `remote`，其中 `remote` 提供了一个组件 `Component` ，接下来我们将通过模块联邦让 `host` 能够使用 `Component` 。

> ps：`host` 和 `remote`只是为了让大家更换的理解，在当前例子中 ，`remote`负责提供被消费的代码，`host` 负责消费 `remote` 提供的代码。但实际使用中，一个应用既可以为其他应该提供消费的代码，同时也可以消费其他应用的代码

host 代码:

```js
// /src/index.js
import("./bootstrap");

// /src/bootstrap.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
ReactDOM.render(<App />, document.getElementById("root"));

// /src/App.js
import React from "react";

const RemoteComponent = React.lazy(() => import("remote/Component"));

const App = () => (
	<div>
		<h2>Host</h2>
		<React.Suspense fallback="Loading Remote Component">
			<RemoteComponent />
		</React.Suspense>
	</div>
);

export default App;
```

host 配置：

```js
...
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	...,
	plugins: [
		new ModuleFederationPlugin({
			name: "host",
			remotes: {
				remote: "remote@http://localhost:9001/remoteEntry.js",
			},
			shared: ["react", "react-dom"],
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
		new CleanWebpackPlugin(),
	],
};
```

remote 代码：

```js
// /src/index.js
import("./bootstrap");

// /src/bootstrap.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
ReactDOM.render(<App />, document.getElementById("root"));

// /src/App.js
import LocalComponent from "./Component";
import React from "react";

const App = () => (
	<div>
		<h2>Remote</h2>
		<LocalComponent />
	</div>
);

export default App;

// /src/Component.js
import React from "react";

const Component = () => <button>Remote Component</button>;

export default Component;
```

remote配置：

```js
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
	// ...,
	plugins: [
		new ModuleFederationPlugin({
			name: "remote",
			library: { type: "var", name: "remote" },
			filename: "remoteEntry.js",
			exposes: {
				"./Component": "./src/Component",
			},
			shared: ["react", "react-dom"],
		}),
	],
};
```

`host`中成功引入了`remote`的组件：

![image.png](https://upload-images.jianshu.io/upload_images/13434832-14b6436ec0a651d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800)

不知道大家看到代码有没有很好奇为什么需要通过`index.js` 去动态加载 `bootstrap.js`，如果我们把 bootstrap 这一层去掉会不会有啥问题呢？我们来把`host`的`entry`直接设置为`"./src/bootstrap"`试试看：

![image.png](https://upload-images.jianshu.io/upload_images/13434832-0b1d280c2f257d0e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800)

这是为什么呢？接着往下看。

## host 究竟是怎么去消费 remote 的

正确配置下的`host`的 js 文件加载顺序如下：

![image.png](https://upload-images.jianshu.io/upload_images/13434832-4a5f9f14165ce7ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400)

先看看最早加载的 main.js 做了些什么:

```js
(() => {
	// webpackBootstrap
	var __webpack_modules__ = {
		"./src/index.js": (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
			__webpack_require__
				.e(/*! import() */ "src_bootstrap_js")
				.then(
					__webpack_require__.bind(__webpack_require__, /*! ./bootstrap */ "./src/bootstrap.js")
				);
		},
		//external "remote@http://localhost:9001/remoteEntry.js"
		"webpack/container/reference/remote": (
			module,
			__unused_webpack_exports,
			__webpack_require__
		) => {
			"use strict";
			var __webpack_error__ = new Error();
			module.exports = new Promise((resolve, reject) => {
				if (typeof remote !== "undefined") return resolve();
				__webpack_require__.l(
					"http://localhost:9001/remoteEntry.js",
					event => {
						if (typeof remote !== "undefined") return resolve();
						var errorType = event && (event.type === "load" ? "missing" : event.type);
						var realSrc = event && event.target && event.target.src;
						__webpack_error__.message =
							"Loading script failed.\n(" + errorType + ": " + realSrc + ")";
						__webpack_error__.name = "ScriptExternalLoadError";
						__webpack_error__.type = errorType;
						__webpack_error__.request = realSrc;
						reject(__webpack_error__);
					},
					"remote"
				);
			}).then(() => remote);
		},
	}; // The module cache
	var __webpack_module_cache__ = {}; // The require function
	function __webpack_require__(moduleId) {...} // expose the modules object (__webpack_modules__)

	...//webpack runtime

	var __webpack_exports__ = __webpack_require__("./src/index.js");
})();
```

main.js 执行 `webpack_require("./src/index.js")`去加载`index.js`,`index.js`通过`webpack_require.e`动态加载`bootstrap.js`。咋一看好像和 webpack4 没啥区别，但其实`webpack_require.e`已经面目全非了。

```js
	(() => {
		__webpack_require__.f = {}; // This file contains only the entry chunk. // The chunk loading function for additional chunks
		__webpack_require__.e = chunkId => {
			return Promise.all(
				Object.keys(__webpack_require__.f).reduce((promises, key) => {
					__webpack_require__.f[key](chunkId, promises);
					return promises;
				}, [])
			);
		};
	})(); /* webpack/runtime/get javascript chunk filename */
```

`webpack_require.e`会去遍历执行`webpack_require.f`上的所有属性，每个属性都是返回 promise 对象的函数，再通过`promise.all`使得当所有的属性的状态都为 resolve 时，`webpack_require.e`的状态才会 resolve。
那么，`webpack_require.f`都有哪些属性呢？

```js
__webpack_require__.f.remotes = (chunkId, promises) => {}
__webpack_require__.f.consumes = (chunkId, promises) => {}
__webpack_require__.f.j = (chunkId, promises) => {}
```

- `consumes`:用于处理共享文件；
- `j`:原有的`webpack_require.e`函数；
- `remotes`:用于加载`remote`提供的组件；

重点来看看 `__webpack_require__.f.remotes`:

```js
(() => {
		var chunkMapping = {
			webpack_container_remote_remote_Component: ["webpack/container/remote/remote/Component"],
		};
		var idToExternalAndNameMapping = {
			"webpack/container/remote/remote/Component": [
				"default",
				"./Component",
				"webpack/container/reference/remote",
			],
		};
		__webpack_require__.f.remotes = (chunkId, promises) => {
			if (__webpack_require__.o(chunkMapping, chunkId)) {
				chunkMapping[chunkId].forEach(id => {
					var getScope = __webpack_require__.R;
					if (!getScope) getScope = [];
					var data = idToExternalAndNameMapping[id];
					...,
					var handleFunction = (fn, arg1, arg2, d, next, first) => {
						try {
							var promise = fn(arg1, arg2);
							if (promise && promise.then) {
								var p = promise.then(result => next(result, d), onError);
								if (first) promises.push((data.p = p));
								else return p;
							} else {
								return next(promise, d, first);
							}
						} catch (error) {
							onError(error);
						}
					};
					var onExternal = (external, _, first) =>
						external
							? handleFunction(__webpack_require__.I, data[0], 0, external, onInitialized, first)
							: onError();
					var onInitialized = (_, external, first) =>
						handleFunction(external.get, data[1], getScope, 0, onFactory, first);
					var onFactory = factory => {
						data.p = 1;
						__webpack_modules__[id] = module => {
							module.exports = factory();
						};
					};
					handleFunction(__webpack_require__, data[2], 0, 0, onExternal, 1);
				});
			}
		};
	})();
```

`__webpack_require__.f.remotes`主要做了四件事：

1. `__webpack_require__("webpack/container/reference/remote", 0);`
2. `__webpack_require__.I("default", getScope);`
3. `external.get("./Component", getScope);`
4. `onFactory(//external.get("./Component", getScop)的结果)`

第一步实际上是去加载了`remote`的`remoteEntry.js`,那么我们先来看看`remoteEntry.js`的内容：

```js
var remote;
(() => {
	// webpackBootstrap
	var __webpack_modules__ = {
		//!*** container entry ***!
		"webpack/container/entry/remote": (__unused_webpack_module, exports, __webpack_require__) => {
			var moduleMap = {
				"./Component": () => {
					return Promise.all([
						__webpack_require__.e("webpack_sharing_consume_default_react_react-_024c"),
						__webpack_require__.e("src_Component_js"),
					]).then(() => () => __webpack_require__(/*! ./src/Component */ "./src/Component.js"));
				},
			};
			var get = (module, getScope) => {
				__webpack_require__.R = getScope;
				getScope = __webpack_require__.o(moduleMap, module)
					? moduleMap[module]()
					: Promise.resolve().then(() => {
							throw new Error('Module "' + module + '" does not exist in container.');
					  });
				__webpack_require__.R = undefined;
				return getScope;
			};
			var init = (shareScope, initScope) => {
				if (!__webpack_require__.S) return;
				var oldScope = __webpack_require__.S["default"];
				var name = "default";
				if (oldScope && oldScope !== shareScope)
					throw new Error(
						"Container initialization failed as it has already been initialized with a different share scope"
					);
				__webpack_require__.S[name] = shareScope;
				return __webpack_require__.I(name, initScope);
			};

			// This exports getters to disallow modifications
			__webpack_require__.d(exports, {
				get: () => get,
				init: () => init,
			});
		},
	};

	// The module cache
	var __webpack_module_cache__ = {};

	// The require function
	function __webpack_require__(moduleId) {...}
	//webpack runtime...

	var __webpack_exports__ = __webpack_require__("webpack/container/entry/remote");
	remote = __webpack_exports__;
})();
```

先来看看第一行和倒数第二行，`remoteEntry.js`声明了一个全局变量 remote，并把`__webpack_require__("webpack/container/entry/remote")`的赋予它，
那我们再来看看`"webpack/container/entry/remote"`，主要有三个部分组成:

- `moduleMap`：`remote`中的 exposes 配置对应的模块集合；
- `get`: `remote`中的组件的 getter，`host`可通过该函数获取远程组件；
- `init`：`host`可以通过该函数将 shared 依赖注入`remote`中;
  其实`init`和`get`操作将会在`__webpack_require__.f.remotes`的 2、3 步中调用，而第四步`onFactory(//external.get("./Component", getScop)的结果)`便会把`remote`中暴露的`./Component`组件引入到`host`中。

至于为什么需要通过`index.js` 去动态加载 `bootstrap.js`，这是因为我们配置了`shared`。`shared`中配置的共享依赖`react`、`react-dom`需要我们在`__webpack_require__.f.consumes`中进行处理，不然无法正常引入。如果我们把`shared`配置清空，应用是可以正常运行的，但这么做的话共享依赖的特性便无法生效。
