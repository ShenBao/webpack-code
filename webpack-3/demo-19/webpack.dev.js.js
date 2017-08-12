const path = require('path');


module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, './dist/assets'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map'
  },

  devServer: {
    port: 7777,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
  }
}