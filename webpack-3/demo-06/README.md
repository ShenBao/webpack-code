
# 加载数据

类似于 NodeJS，JSON 支持实际上是内置的，也就是说 import Data from './data.json' 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 csv-loader 和 xml-loader。

`
npm install --save-dev csv-loader xml-loader
`


```
{
    test: /\.(csv|tsv)$/,
    use: [
        'csv-loader'
    ]
},
{
    test: /\.xml$/,
    use: [
        'xml-loader'
    ]
}
```


