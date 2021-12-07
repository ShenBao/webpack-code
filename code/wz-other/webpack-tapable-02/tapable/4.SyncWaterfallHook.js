// let {SyncLoopHook} = require('tapable');
class SyncLoopHook {
  constructor() {
    this.tasks = [];
  }
  tap(name, callback) {
    this.tasks.push(callback);
  }
  call(...args) {
    this.tasks.forEach(task=>{
      // 每个任务执行依次
      let ret;
      do{
        ret = task(...args);
      } while (ret!==undefined);
    })
  }
}
let hook = new SyncLoopHook([]);
// 如果任何一个任务有返回值 会不停的执行这个函数
let index = 0;
hook.tap('第一个',function () {
  console.log('xxx');
  index++;
  if(index !== 2){
    return true;
  }
})
hook.tap('第二个', function () {
 console.log('第二个')
});
hook.call();