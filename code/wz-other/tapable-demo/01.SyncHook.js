let {SyncHook} = require ('tapable');

class Example {
  constructor () {
    this.hooks = {
      arch: new SyncHook (['name']),
    };
  }
  tap () {
    this.hooks.arch.tap ('node', name => {
      console.log ('node', name);
    });
    this.hooks.arch.tap ('react', name => {
      console.log ('react', name);
    });
  }
  start () {
    this.hooks.arch.call ('test');
  }
}

let ex = new Example ();
ex.tap (); // 注册事件
ex.start (); // 启动钩子
