const path    = require('path');
const webpack = require('webpack');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: {
    //   vendor: ['react', 'react-dom']
      vendor: Object.keys(deps)
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
};