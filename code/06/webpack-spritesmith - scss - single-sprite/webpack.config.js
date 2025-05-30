const path = require('path');

const SpritesmithPlugin = require('webpack-spritesmith');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {test: /\.png$/, loaders: ['file-loader?name=img/[hash].[ext]']},
    ],
  },
  resolve: {
    modules: ['node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/ico'),
        glob: '*.png',
      },
      target: {
        image: path.resolve(__dirname, 'src/assets/sprites/sprite.[hash].png'),
        css: [
          [
            path.resolve(__dirname, 'src/assets/sprites/sprite.scss'),
            {
              format: 'handlebars_based_template',
              spritesheetName: 'sprite',
            },
          ],
        ],
      },
      customTemplates: {
        handlebars_based_template: path.resolve(
          __dirname,
          'scss.template.handlebars'
        ),
      },
      apiOptions: {
        cssImageRef: '~sprite.[hash].png',
      },
      spritesmithOptions: {
        algorithm: 'binary-tree',
        padding: 10,
      },
    }),
  ],
};
