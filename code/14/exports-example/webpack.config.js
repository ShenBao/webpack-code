var htmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
  },
  plugins: [
    new htmlPlugin({
      template: './index.html',
    }),
  ],
};
