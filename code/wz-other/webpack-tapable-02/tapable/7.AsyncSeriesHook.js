// let {AsyncSeriesHook} = require('tapable');
class AsyncSeriesHook {
  constructor() {
    this.tasks = [];
  }
  tapAsync(name, callback) {
    this.tasks.push(callback);
  }
  callAsync(callback) {
    let index = 0;
    let next =(err) => {
      if(err){
        return callback();
      }
      if (index === this.tasks.length) return callback()
      let task = this.tasks[index++];
      task(next);
    }
    next();
  }
}
let hook = new AsyncSeriesHook();
hook.tapAsync('第一个插件', function (cb) {
  setTimeout(() => { // AsyncSeriesBailHook
    console.log('第一个插件');
    cb('参数');
  }, 1000);
})
hook.tapAsync('第二个插件', function (cb) {
  setTimeout(() => {
    console.log('第二个插件');
    cb();
  }, 1000);
});
hook.callAsync(function () {
  console.log('ok')
});