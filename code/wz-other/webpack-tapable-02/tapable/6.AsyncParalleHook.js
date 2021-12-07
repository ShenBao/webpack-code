// let {AsyncParallelHook} = require('tapable');
class AsyncParallelHook {
  constructor() {
    this.tasks = [];
  }
  tapPromise(name, callback) {
    this.tasks.push(callback);
  }
  callAsync(callback) {
    // 默认会让promise中的异步方法全执行
    let promises = this.tasks.map(task=>task());
    // 如果任何一个promise出错了 直接调用callback即可
    Promise.all(promises).then(callback).catch(callback)
  }
}
let hook = new AsyncParallelHook();
hook.tapPromise('第一个插件', function () {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('第一个插件');
      reject();
    }, 1000);
  })
})
hook.tapPromise('第二个插件', function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('第二个插件');
      resolve();
    }, 2000);
  })
});
hook.callAsync(function () {
  console.log('ok');
})