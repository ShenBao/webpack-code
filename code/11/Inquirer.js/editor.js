const inquirer = require('inquirer');

const promptList = [{
    type: "editor",
    message: "请输入备注：",
    name: "editor"
}];

inquirer.prompt(promptList).then(answers => {
    console.log(answers);
});
