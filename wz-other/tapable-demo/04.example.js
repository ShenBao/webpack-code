class SyncBailHook {
  constructor (args) {
    this.tasks = [];
  }
  tap (name, task) {
    this.tasks.push (task);
  }
  call (...args) {
    let ret; // 当前这个函数的返回值
    let index = 0; // 当前要执行的下标
    do {
      ret = this.tasks[index] (...args);
      index++;
    } while (ret === undefined && index < this.tasks.length);
  }
}

let hook = new SyncBailHook (['name']);
hook.tap ('node', name => {
  console.log ('node', name);
  return '停止向下执行';
});
hook.tap ('react', name => {
  console.log ('raect', name);
});

hook.call ('call test');
