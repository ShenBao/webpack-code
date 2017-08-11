
＃ 多出口

```
const path = require('path');

  module.exports = {
    entry: {
-     index: './src/index.js',
+     app: './src/index.js',
+     print: './src/print.js'
    },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
执行 
```

