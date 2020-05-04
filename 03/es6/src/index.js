import { helloworld } from './hello';

document.write(helloworld());

console.log(helloworld());

class App {
    constructor(){
        console.log('App');
    }

    log() {
        console.log('App log');
    }

    get name() {
        return 'haha name'
    }
}

const app = new App();
app.log();

console.log(app.name);

