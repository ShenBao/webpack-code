
＃ css


`
npm install --save-dev style-loader css-loader
`


```
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       }
     ]
   }
```


