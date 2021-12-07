const path = require('path');
const Config = require('webpack-chain');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = new Config();

// mode
config.mode('development');

// entry
config.entry('index').add('./src/index.tsx');

// output
config.output
  .path(path.resolve(__dirname, '..', 'dist'))
  .filename(`[name].js`)
  .chunkFilename(`[name].async.js`);

config.resolve.extensions.merge(['.ts', '.tsx', '.js', '.jsx']);

config.devtool('source-map').end();

// server
config.devServer
  .contentBase(path.join(__dirname, '..', 'dist'))
  .port(3000)
  .open(true);

// css
config.module
  .rule('css')
  .test(/\.css$/)
  .oneOf('CSSModules')
  .resourceQuery(/cssModules/)
  .use('extract-css-loader')
  .loader(MiniCssExtractPlugin.loader)
  .options({
    publicPath: '/',
    hmr: true,
  })
  .end()
  .use('css-loader')
  .loader(require.resolve('css-loader'))
  .options({
    sourceMap: true,
    importLoaders: 1,
    modules: {
      mode: 'local',
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  })
  .end()
  .end()
  .oneOf('normal')
  .use('extract-css-loader')
  .loader(MiniCssExtractPlugin.loader)
  .options({
    publicPath: '/',
  })
  .end()
  .use('css-loader')
  .loader(require.resolve('css-loader'))
  .options({
    sourceMap: false,
    importLoaders: 2,
  })
  .end()
  .end();

config.module
  .rule('ts')
  .test(/\.tsx?$/)
  .exclude.add(/node_modules/)
  .end()
  .use('babel-loader')
  .loader(require.resolve('babel-loader'))
  .options({
    plugins: [[require.resolve('@babel-plugins/umi-css-modules')]],
  })
  .end()
  .use('ts-loader')
  .loader(require.resolve('ts-loader'))
  .end();

// plugins
config
  .plugin('html')
  .use(HtmlWebpackPlugin, [
    {
      filename: 'index.html',
      template: 'build/template/index.html',
    },
  ])
  .end()
  .plugin('extract-css')
  .use(MiniCssExtractPlugin, [
    {
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    },
  ]);

module.exports = config.toConfig();
