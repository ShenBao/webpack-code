const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name]-[chunkhash:12].js',
    sourceMapFilename: '[file].map', 
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',// 开发环境
  devServer: {
    // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
    contentBase: path.join(__dirname, "dist"),
    // contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")],
    // contentBase: false , // 禁用

    host: 'localhost',
    port: 80,
    compress: true,

    bonjour: true,

    // 当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换(Hot Module Replacement)启用时。这可能显得很繁琐
    // clientLogLevel: "none"

    // 启用gzip 压缩：
    compress: true,

    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/$/, to: '/views/landing.html' },
    //     { from: /^\/subpage/, to: '/views/subpage.html' },
    //     { from: /./, to: '/views/404.html' }
    //   ]
    // },

    // 启用 webpack 的模块热替换特性
    // hot: true,
      
    // hotOnly: true,

    
    // https: true,
    // https: {
    //   key: fs.readFileSync("/path/to/server.key"),
    //   cert: fs.readFileSync("/path/to/server.crt"),
    //   ca: fs.readFileSync("/path/to/ca.pem"),
    // }


    // inline: false,

    // 当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为“惰性模式”
    // lazy: true,
    
    // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    noInfo: true,
    
    // 自动打开浏览器
    open: true,

    

    // 代理
    proxy: {
      "/api": "http://live.ixingji.com"
    },
    // 请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。
    // 如果你不想始终传递 /api ，则需要重写路径：
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     pathRewrite: {"^/api" : ""}
    //   }
    // },

    // // 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，修改配置如下：
    // proxy: {
    //   "/api": {
    //     target: "https://other-server.example.com",
    //     secure: false
    //   }
    // },

    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     bypass: function(req, res, proxyOptions) {
    //       if (req.headers.accept.indexOf("html") !== -1) {
    //         console.log("Skipping proxy for browser request.");
    //         return "/index.html";
    //       }
    //     }
    //   }
    // },

    // proxy: [{
    //   context: ["/auth", "/api"],
    //   target: "http://localhost:3000",
    // }],


    // public:
    

    // publicPath: "/assets/",
    // publicPath: "http://localhost:8080/assets/",


    // 接入express
    // setup(app){
    //   app.get('/some/path', function(req, res) {
    //     res.json({ custom: 'response' });
    //   });
    // },

    // socket: 'socket',







  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [
          'style',
          'css'
        ]
      },
    ]
  },

  resolveLoader: {
      modules: ["node_modules"],
      extensions: [".js", ".json"],
      mainFields: ["loader", "main"],
      moduleExtensions: ['-loader'], 
      
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
  ]
};