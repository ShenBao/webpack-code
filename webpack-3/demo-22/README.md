
# webpack-cli


```
webpack --help
webpack -h
webpack --config example.config.js

webpack --env.production    # 生产环境设置为 true
webpack --env.platform=web  # 平台设置为 "web"

webpack --json
webpack --json > stats.json

webpack index=./src/index.js index2=./src/index2.js --output-path='./dist' --output-filename='[name][hash].bundle.js'

webpack.js index=./src/index.js index2=./src/index2.js --output-path='./dist' --output-filename='[name][hash].bundle.js' --devtool source-map --output-source-map-filename='[name]123.map'

--progress  打印出编译进度的百分比值

"dev": "webpack-dev-server --open --progress --profile",










```























