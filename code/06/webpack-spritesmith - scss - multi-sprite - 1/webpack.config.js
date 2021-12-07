const path = require ('path');
const fs = require ('fs');

const SpritesmithPlugin = require ('webpack-spritesmith');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const ExtractCssChunks = require ('extract-css-chunks-webpack-plugin');

const spritesmithPlugins = () => {
  const spriteImgPlugins = [];
  fs.readdirSync ('src/assets/sprites').map (dirname => {
    if (fs.statSync (`src/assets/sprites/${dirname}`).isDirectory ()) {
      spriteImgPlugins.push (
        new SpritesmithPlugin ({
          src: {
            cwd: path.resolve (__dirname, `src/assets/sprites/${dirname}`),
            glob: '*.png',
          },
          target: {
            image: path.resolve (
              __dirname,
              `src/assets/sprites/${dirname}.[hash].png`
            ),
            css: [
              [
                path.resolve (__dirname, `src/assets/sprites/_${dirname}.scss`),
                {
                  spritesheetName: dirname,
                },
              ],
            ],
          },
          // 样式文件中调用雪碧图地址写法
          apiOptions: {
            generateSpriteName: function (fullPath) {
              let parsed = path.parse (fullPath);
              return dirname + '_' + parsed.name;
            },
            cssImageRef: `./assets/sprites/${dirname}.[hash].png`,
          },
          spritesmithOptions: {
            algorithm: 'binary-tree',
            padding: 10,
          },
        })
      );
    }
  });
  return spriteImgPlugins;
};

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
        test: /\.scss$/,
        use: [
          'style-loader',
          // {
          //   loader: ExtractCssChunks.loader,
          //   options: {
          //     modules: false,
          //     reloadAll: true,
          //   },
          // },
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve (__dirname, './src/assets/sprites/*.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: '[name].[ext]',
              outputPath: 'img',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin (),
    // new ExtractCssChunks({
    //   filename: '[name].css',
    //   chunkfilename: '[name].css',
    // }),
    new HtmlWebpackPlugin ({
      template: path.join (__dirname, 'src/index.html'),
    }),
    ...spritesmithPlugins (),
  ],
};
