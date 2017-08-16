var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {  
              presets: ['env'],
              plugins: [
                'transform-runtime',
              ],
              cacheDirectory: true,//打包性能提升很明显
            }
          },
          // {
          //   loader: 'cache-loader',
          //   options: {
          //     cacheDirectory: path.resolve('.cache')
          //   }
          // },
        ]
      },

      {
        test: /\.css$/,
        use: 
          ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [ 'css-loader' ]
          }),
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new ExtractTextPlugin({
        filename: '[name].css'
      })
  ]
};