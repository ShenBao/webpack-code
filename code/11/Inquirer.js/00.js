const inquirer = require('inquirer');

const promptList = [];

inquirer.prompt(promptList).then(answers => {
    console.log(answers);
});
