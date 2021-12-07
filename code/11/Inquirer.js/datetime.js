const inquirer = require('inquirer');

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))

const promptList = [
    {
        type: 'datetime',
        name: 'dt',
        message: 'When would you like a table?',
        initial: new Date('2017-01-01 12:30'),
        format: ['mm', '/', 'dd', '/', 'yyyy', ' ', 'hh', ':', 'MM', ' ', 'TT']
    }
];

inquirer.prompt(promptList).then(function (answers) {
    console.log(JSON.stringify(answers, null, '  '));
});