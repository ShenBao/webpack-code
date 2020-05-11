const inquirer = require('inquirer');

const promptList = [{
    type: "checkbox",
    message: "选择颜色:",
    name: "color",
    choices: [
        "red",
        "blur",
        "green",
        "yellow"
    ],
    pageSize: 2 // 设置行数
}];

inquirer.prompt(promptList).then(answers => {
    console.log(answers);
});
