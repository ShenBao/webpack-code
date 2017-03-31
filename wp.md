
##  webpack 是什么

>   webpack is a module bundler. webpack takes modules with dependencies and generates static assets representing those modules

webpack 是一个模块打包工具，输入为包含依赖关系的模块集，输出为打包合并的前端静态资源。webpack 是同时支持 AMD 和 CommonJs 的模块定义方式，不仅如此，webpack 可以将任何前端资源视为模块，如 js,jade,css,less,sass,jsx,png,jpg等。

##  为什么要引入新的打包工具

webpack 之前的打包工具工具功能单一，只能完成特定的任务，然而 web 前端工程是复杂的，一个 webapp 对于业务代码的要求可能有：

- 代码可以分块，实现按需加载
- 首屏加载时间要尽量减少
- 需要集成一些第三方库

对于模块打包工具，单一的支持 CommonJs 的打包在大型项目中是不够用的，为了满足一个大型项目的前端需求，那么一个打包工具应该包含一些这些功能：

- 支持多个 bundler 输出 -> 解决代码分块问题
- 异步加载 -> 按需加载，优化首屏加载时间
- 可定制化 -> 可以集成第三方库，可以定制化打包过程
- 其他资源也可以定义为模块


webpack 的出现正式为了解决这些问题，在 webpack 中，提供了一下这些功能：

- 代码分块： webpack 有两种类型的模块依赖，一种是同步的，一种是异步的。在打包的过程中可以将代码输出为代码块（chunk），代码块可以实现按需加载。 异步加载的代码块通过分割点（spliting point）来确定。
- Loaders： Webpack 本身只会处理 Javascript，为了实现将其他资源也定义为模块，并转化为 Javascript， Webpack 定义 loaders , 不同的 loader 可以将对应的资源转化为 Javascript 模块。
- 智能的模块解析： webpack 可以很容易将第三方库转化为模块集成到项目代码中，模块的依赖可以用表达式的方式（这在其他打包工具中是没有支持的），这种模块依赖叫做动态模块依赖。
- 插件系统： webpack 的可定制化在于其插件系统，其本身的很多功能也是通过插件的方式实现，插件系统形成了 webpack 的生态，是的可以使用很多开源的第三方插件。


##  webpack 核心思想
webpack 的三个核心：

- 万物皆模块：在 webpack 的世界中，除了 Javascript，其他任何资源都可以当做模块的方式引用
- 按需加载： webapp 的优化关键在于代码体积，当应用体积增大，实现代码的按需加载是刚需，这也是 webpack 出现的根本原因
- 可定制化： 任何一个工具都不可能解决所有问题，提供解决方案才是最可行的，webpack 基于可定制化的理念构建，通过插件系统，配置文件，可以实现大型项目的定制需求。

























