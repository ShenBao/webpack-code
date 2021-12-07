'use strict';

const path = require ('path');
const glob = require ('glob');

const HtmlWebpackPlugin = require ('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const getMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync (path.join (__dirname, './src/*/index.js'));

  Object.keys (entryFiles).map (index => {
    const entryFile = entryFiles[index];
    const match = entryFile.match (/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    htmlWebpackPlugins.push (
      new HtmlWebpackPlugin ({
        inlineSource: '.css$',
        template: path.join (__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const {entry, htmlWebpackPlugins} = getMPA ();

module.exports = {
  entry: entry,
  output: {
    path: path.join (__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        include: path.resolve (__dirname, 'src'),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin (),
    ...htmlWebpackPlugins,
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../static/analyzer/report.html',
      openAnalyzer: false
    }),
  ],
};
