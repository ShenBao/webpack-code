// let {AsyncSeriesHook} = require('tapable');
class AsyncSeriesHook {
  constructor() {
    this.tasks = [];
  }
  tapPromise(name, callback) {
    this.tasks.push(callback);
  }
  callAsync(callback) {
    // 希望将promise 串联起来
    let first = this.tasks.shift();
    this.tasks.reduce((a,b)=>a.then(()=>b()), first()).then(callback);
  }
}
let hook = new AsyncSeriesHook();
hook.tapPromise('第一个插件', function () {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('第一个')
      resolve()
    }, 1000);
  });
})
hook.tapPromise('第二个插件', function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('第二个')
      resolve()
    }, 1000);
  });
});
hook.tapPromise('第三个插件', function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('第三个')
      resolve()
    }, 1000);
  });
});
hook.callAsync(function () {
  console.log('ok')
});