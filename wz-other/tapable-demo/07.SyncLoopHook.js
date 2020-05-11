let {SyncLoopHook} = require ('tapable');
class Example {
  constructor () {
    this.index = 0;
    this.hooks = {
      arch: new SyncLoopHook (['name']),
    };
  }
  tap () {
    this.hooks.arch.tap ('node', name => {
      console.log ('node', name);
      return ++this.index === 3 ? undefined : '继续';
    });
    this.hooks.arch.tap ('react', data => {
      console.log ('react', data);
    });
  }
  start () {
    this.hooks.arch.call ('test');
  }
}

let ex = new Example ();
ex.tap (); // 注册事件
ex.start (); // 启动钩子
