const path = require ('path');

const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

const FileListPlugin = require ('./plugins/FileListPlugin');
const ZipPlugin = require ('./plugins/ZipPlugin');
const InlineSourcePlugin = require ('./plugins/InlineSourcePlugin');
// const UploadPlugin = require ('./plugins/UploadPlugin');

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve (__dirname, 'dist'),
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve (__dirname, 'loaders')],
  },
  // devtool: 'source-map',
  module: {
    rules: [{test: /\.css$/, use: ['style-loader', 'css-loader']}],
  },
  plugins: [
    new CleanWebpackPlugin (),
    new HtmlWebpackPlugin ({
      template: './src/index.html',
    }),
    // new InlineSourcePlugin ({
    //   match: /\.(js|css)/,
    // }),
    new FileListPlugin ({
      filename: 'file-list.md',
    }),
    new ZipPlugin ({
      filename: 'bundle.offline',
    }),
    // new UploadPlugin({
    //   bucket:'aaa',
    //   domain: "img.domain.cn",
    //   accessKey:'accessKey',
    //   secretKey:'secretKey'
    // }),
  ],
};
