// let {AsyncParallelHook} = require('tapable');

class AsyncParallelHook {
  constructor() {
    this.tasks = [];
  }
  tapAsync(name, callback) {
    this.tasks.push(callback);
  }
  callAsync(callback) {
    let index = 0;
    let done = () => { // 传递给每个函数的回调
      index++;
      if(index == this.tasks.length){
        callback();
      }
    }
    this.tasks.forEach(task=>{
      task(done);
    });
  }
}
let hook = new AsyncParallelHook();
// 在tapable中绑定形式用三种 tap 绑定同步 tapAsync 绑定异步 tapPromise绑定promise
// 触发的时候 call (触发同步) callAsync(触发异步)
hook.tapAsync('第一个插件', function (cb) {
  setTimeout(() => {
    console.log('第一个插件');
    cb();
  }, 1000);
})
hook.tapAsync('第二个插件', function (cb) {
  setTimeout(() => {
    console.log('第二个插件');
    cb();
  }, 2000);
});
hook.callAsync(function () {
  console.log('ok')
});