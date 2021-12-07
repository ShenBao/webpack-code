// 1) 是一个同步钩子 非常像 events  on/emit
// 发布订阅
// let {SyncHook} = require('tapable');
class SyncHook {
  constructor(){
    this.tasks = [];
  }
  tap(name,callback){
    this.tasks.push(callback);
  }
  call(...args){
    this.tasks.forEach(fn=>fn(...args));
  }
}
// 数组中只用来规定执行方法的参数个数
let hook = new SyncHook(['name']);
// tap 的第一个参数只有标识作用
hook.tap('第一件事',function (name,name2) {
  console.log('one', name,name2)
});
hook.tap('第二件事', function (name) {
  console.log('two', name)
});
hook.call('jw','zf');