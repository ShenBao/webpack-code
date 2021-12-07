const inquirer = require('inquirer');

const promptList = [{
    type: "expand",
    message: "请选择一种水果：",
    name: "fruit",
    choices: [
        {
            key: "a",
            name: "Apple",
            value: "apple"
        },
        {
            key: "O",
            name: "Orange",
            value: "orange"
        },
        {
            key: "p",
            name: "Pear",
            value: "pear"
        }
    ]
}];

inquirer.prompt(promptList).then((answers) => {
    console.log(answers)
})
