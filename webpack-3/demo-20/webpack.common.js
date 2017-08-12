const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, './dist/assets'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map'
  },
}