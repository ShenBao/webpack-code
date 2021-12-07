const chalk = require('chalk');
const log = console.log;

// 颜色字体
log(chalk.red('红色'));

// 背景色
log(chalk.bgBlue('蓝色背景'));

// 样式字体
log(chalk.bold('加粗'));

// 多参数
log(chalk.blue('name', 'age', 'job'));

// ES6 多行文本
log(
    // 多行文本将保留缩进格式
    chalk.blue(`
        name: Rogan
        age: ${25}
        job: ${'IT'}
    `)
);

// 其他颜色设置方式
log(chalk.keyword('orange')(' keyword ')); // 关键字
log(chalk.rgb(100, 100, 100)(' rgb ')); // rgb
log(chalk.hex('#ffffff')(' hex ')); // hex

// 样式组合
log(` colors: ${chalk.blue('blue')}, ${chalk.red('red')} `); // 拼接

log(chalk.blue.bold('Title')); // 链式组合

log(chalk.bgYellow(` error: ${chalk.red(' chalk is undefined ')} `)); // 嵌套
