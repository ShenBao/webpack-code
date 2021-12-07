import name from './name';

class Test {
  constructor() {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
let test = new Test();
console.log(test.getName());

import p from './public.jpg';
let img = document.createElement('img');
img.src = p;
document.body.appendChild(img);

import './index.less';
