let {SyncBailHook} = require ('tapable');

class Example {
  constructor () {
    this.hooks = {
      arch: new SyncBailHook (['name']),
    };
  }
  tap () {
    this.hooks.arch.tap ('node', name => {
      console.log ('node', name);
      return 'test error'; // * 重要
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
