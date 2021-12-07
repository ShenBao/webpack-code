const ora = require('ora');

const spinner = new ora({
    discardStdin: false,
    text: 'Loading unicorns, not discarding stdin',
    spinner: process.argv[2],
});

const spinnerDiscardingStdin = new ora({
    text: 'Loading unicorns',
    spinner: process.argv[2],
});

spinnerDiscardingStdin.start();

setTimeout(() => {
    spinnerDiscardingStdin.succeed();
}, 1000);

setTimeout(() => {
    spinnerDiscardingStdin.start();
}, 2000);

setTimeout(() => {
    spinnerDiscardingStdin.succeed();
    spinner.start();
}, 3000);

setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = `Loading rainbows`;
}, 4000);

setTimeout(() => {
    spinner.color = 'green';
    spinner.indent = 2;
    spinner.text = 'Loading with indent';
}, 5000);

setTimeout(() => {
    spinner.indent = 0;
    spinner.spinner = 'moon';
    spinner.text = 'Loading with different spinners';
}, 6000);

setTimeout(() => {
    spinner.succeed();
}, 7000);
