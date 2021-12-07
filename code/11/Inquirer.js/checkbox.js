const inquirer = require('inquirer');

const promptList = [{
    type: "checkbox",
    message: "选择颜色:",
    name: "color",
    choices: [
        {
            name: "red"
        },
        new inquirer.Separator(), // 添加分隔符
        {
            name: "blur",
            checked: true // 默认选中
        },
        {
            name: "green"
        },
        new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
        {
            name: "yellow"
        }
    ]
}];

inquirer.prompt(promptList).then(answers => {
    console.log(answers);
});
