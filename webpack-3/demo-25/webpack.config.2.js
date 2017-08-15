var path = require('path');

module.exports = {

  //基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  context: __dirname, 
  
  entry: {   
    index: "./src/index.js",
  },

  output: {
    filename: '[name].[chunkhash].js',
    // filename: '[name].[chunkhash:10].js',
    // filename: '[name].[hash].js',
    // filename: '[name].[hash:10].js',
    
    path: path.resolve(__dirname, 'dist'),

    // crossOriginLoading: false,            //  禁用跨域加载（默认）
    // crossOriginLoading: "anonymous",      //  不带凭据(credential)启用跨域加载
    // crossOriginLoading: "use-credentials",//  带凭据(credential)启用跨域加载 with credentials





  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
};

