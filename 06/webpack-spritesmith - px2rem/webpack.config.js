const path = require ('path');

const SpritesmithPlugin = require ('webpack-spritesmith');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');

module.exports = {
  context: path.join (__dirname, 'src'),
  entry: './entry.js',
  output: {
    path: path.resolve (__dirname, 'dist'),
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
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          'sass-loader',
        ],
      },
      {test: /\.png$/, loaders: ['file-loader?name=img/[hash].[ext]']},
    ],
  },
  resolve: {
    modules: ['node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin (),
    new HtmlWebpackPlugin ({
      template: path.join (__dirname, 'src/index.html'),
    }),
    new SpritesmithPlugin ({
      src: {
        cwd: path.resolve (__dirname, 'src/ico'),
        glob: '*.png',
      },
      target: {
        image: './src/assets/sprite.png',
        css: [
          './src/assets/_sprite.scss',
          [
            path.resolve (__dirname, './src/assets/_custom_sprite.scss',),
            {
              format: 'custom_handlebars',
            },
          ],
        ],
      },
      apiOptions: {
        cssImageRef: './assets/sprite.png',
      },
      spritesmithOptions: {
        algorithm: 'top-down',
      },
      customTemplates: {
        custom_handlebars: path.resolve (
          __dirname,
          './custom.handlebars'
        ),
      },
    }),
  ],
};
