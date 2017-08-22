const path    = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'dll-user': ['./index.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/vendor-manifest.json')
        })
    ]
};