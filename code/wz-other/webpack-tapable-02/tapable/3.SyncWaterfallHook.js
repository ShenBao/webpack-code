// let {SyncWaterfallHook} = require('tapable');
class SyncWaterfallHook {
  constructor() {
    this.tasks = [];
  }
  tap(name, callback) {
    this.tasks.push(callback);
  }
  call(...args) {
    let first = this.tasks.shift();
    this.tasks.reduce((a,b)=>{
      return b(a);
    }, first(...args));
  }
}
let hook = new SyncWaterfallHook(['name','name2']);

hook.tap('第一个',function (name,name2) {
  console.log(name, name2)
  return '第一次的输出'
})
hook.tap('第二个', function (data) {
  console.log(data)
  return '第二次的输出'
});
hook.tap('第三个', function (data) {
  console.log(data)
});
hook.call('zf','jw');