const inquirer = require('inquirer');

const promptList = [{
    type: 'rawlist',
    message: '请选择一种水果:',
    name: 'fruit',
    choices: [
        "Apple",
        "Pear",
        "Banana"
    ]
}];

inquirer.prompt(promptList).then((answers) => {
    console.log(answers)
})
