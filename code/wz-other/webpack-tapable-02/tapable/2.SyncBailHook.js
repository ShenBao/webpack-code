// 1) 是一个同步钩子 非常像 events  on/emit
// 发布订阅 带保险的钩子
// let { SyncBailHook } = require('tapable');
class SyncBailHook {
  constructor() {
    this.tasks = [];
  }
  tap(name, callback) {
    this.tasks.push(callback);
  }
  call(...args) {
    let index = 0; let ret;
    do {
      let task = this.tasks[index++];
      ret = task(...args);
    } while (ret === undefined && index<this.tasks.length)
  }
}
let hook = new SyncBailHook(['name']);
hook.tap('第一件事', function (name) {
  console.log('one', name);
  return ''
});
hook.tap('第二件事', function (name) {
  console.log('two', name)
});
hook.call('jw');