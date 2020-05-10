const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');

const DonePlugin = require('./plugins/DonePlugin');
const AsyncPlugin = require('./plugins/AsyncPlugin');
const FileListPlugin = require('./plugins/FileListPlugin');
const InlineSourcePlugin = require('./plugins/InlineSourcePlugin');
const ZipPlugin = require('./plugins/zipPlugin');
const UploadPlugin = require('./plugins/UploadPlugin');
const DirTreePlugin = require('./plugins/DirTreePlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'loaders'),
    ],
  },
  module: {
    rules: [
      // {
      //   test: /\.js/,
      //   use: ['loader3', 'loader2', 'loader1']
      // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        // 根据图片生成一个MD5挫 发射到dist目录下，file-loader返回当前的路径。
        // use: 'file-loader'
        // 会处理路径
        use: {
          loader: 'url-loader',
          options: {
            limit: 200 * 1024,
          },
        },
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'banner-loader',
          options: {
            text: 'banner-test',
            filename: path.resolve(__dirname, 'banner.txt'),
          },
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssPlugin({
      filename: 'style.css',
    }),
    new FileListPlugin({
      filename: 'FileList.md',
    }),
    new InlineSourcePlugin({
      match: /\.(js|css)$/,
    }),
    new ZipPlugin({
      filename: 'offline',
    }),
    new DirTreePlugin({
      target: './',
      deep: 100,
    }),
    // new UploadPlugin({
    //   bucket:'static',
    //   domain: "img.cdn.cn",
    //   accessKey:'accessKeyxxx',
    //   secretKey:'secretKeyxxx'
    // })
  ],
};
