let path = require ('path');
class Plugin {
  apply (compiler) {
    compiler.hooks.emit.tap ('emit', function () {
      console.log ('emit');
    });
  }
}
class Plugin1 {
  apply (compiler) {
    compiler.hooks.afterPulgins.tap('emit', function () {
      console.log ('afterPlugins');
    });
  }
}
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve (__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve (__dirname, 'loader', 'style-loader'),
          path.resolve (__dirname, 'loader', 'less-loader'),
        ],
      },
    ],
  },
  plugins: [new Plugin (), new Plugin1 ()],
};
