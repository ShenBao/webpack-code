const inquirer = require('inquirer');

const promptList = [{
    type: "confirm",
    message: "是否使用监听？",
    name: "watch",
    prefix: "前缀"
}, {
    type: "confirm",
    message: "是否进行文件过滤？",
    name: "filter",
    suffix: "后缀",
    when: function (answers) { // 当watch为true的时候才会提问当前问题
        return answers.watch
    }
}];

inquirer.prompt(promptList).then((answers) => {
    console.log(answers)
})
