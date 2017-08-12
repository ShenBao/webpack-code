
# 代码分离

```
new webpack.optimize.CommonsChunkPlugin({
    name: 'common' // Specify the common bundle's name.
})

ExtractTextPlugin: Useful for splitting CSS out from the main application.
bundle-loader: Used to split code and lazy load the resulting bundles.
promise-loader: Similar to the bundle-loader but uses promises.
```

# ProvidePlugin
```
plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    })
]

plugins: [
    new webpack.ProvidePlugin({
      __assign: ['tslib', '__assign'],
      __extends: ['tslib', '__extends'],
    })
  ]
```

# imports-loader

```
module: {
    rules: [{
      test: require.resolve("some-module"),
      use: 'imports-loader?this=>window'
    }]
}

module: {
    rules: [{
      test: require.resolve("some-module"),
      use: 'imports-loader?define=>false'
    }]
}
```

# exports-loader

```
 module: {
    rules: [{
      test: require.resolve("some-module"),
      use: 'exports-loader?file,parse=helpers.parse'
      // 在文件的源码中加入以下代码
      //  exports["file"] = file;
      //  exports["parse"] = helpers.parse;
    }]
  }
```










