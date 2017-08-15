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

  // =================================================================================================================

  // string array object function regex
  externals: {
    jquery: 'jQuery'
  },

  externals: {
    subtract: ['./math', 'subtract']
  },

  externals : {
    react: 'react'
  },

  // 或者

  externals : {
    lodash : {
      commonjs: "lodash",
      amd: "lodash",
      root: "_" // indicates global variable
    }
  },

  // or

  externals : {
    subtract : {
      root: ["math", "subtract"]
    }
  },

  externals: [
    function(context, request, callback) {
      if (/^yourregex$/.test(request)){
        return callback(null, 'commonjs ' + request);
      }
      callback();
    }
  ],

  externals: /^(jquery|\$)$/i,



// =====================================================================================================




  devtool: 'source-map',// 开发环境
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: 'localhost',
    port: 80,
    compress: true,
    historyApiFallback: true,
    noInfo: true,
    open: true,
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