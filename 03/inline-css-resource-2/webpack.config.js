'use strict';

const path = require ('path');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const HTMLInlineCSSWebpackPlugin = require ('html-inline-css-webpack-plugin')
  .default;
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join (__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.html$/,
        use: 'inline-html-loader',
      },
      {
        test: /.js$/,
        use: ['babel-loader'],
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'inline-file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin ({
      filename: '[name]_[contenthash:8].css',
    }),
    new HtmlWebpackPlugin ({
      inlineSource: '.css$',
      template: path.join (__dirname, 'src/index.html'),
    }),
    new HTMLInlineCSSWebpackPlugin (),
  ],
};
