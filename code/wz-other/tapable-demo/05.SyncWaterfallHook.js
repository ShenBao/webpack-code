let {SyncWaterfallHook} = require ('tapable');
// 瀑布传递
class Example {
  constructor () {
    this.hooks = {
      arch: new SyncWaterfallHook (['name']),
    };
  }
  tap () {
    this.hooks.arch.tap ('node', name => {
      console.log ('node', name);
      return 'test-SyncWaterfallHook'; // * 重要
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
