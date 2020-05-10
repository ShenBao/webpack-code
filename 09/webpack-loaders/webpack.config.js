let path = require ('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve (__dirname, 'dist'),
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve (__dirname, 'loaders')],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.jpg$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 20 * 1024,
          },
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: 'banner-loader',
          options: {
            text: '这是 banner 啦',
            filename: path.resolve (__dirname, 'banner.js'),
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
};
