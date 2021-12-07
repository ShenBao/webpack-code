/*
* SyncWaterfallHook
* 同步串行执行, 但是每一个函数的返回值都可以作为下一个函数的参数
* */

const SyncWaterfallHook = require('./sim/simSyncWaterfallHook')

class Loopen {
  constructor() {
    this.hooks = {
      argv: new SyncWaterfallHook(['name'])
    }
  }

  // 订阅事件
  tap() {
    this.hooks.argv.tap('sayName', name => {
      console.log(name)
      return '有返回值'
    })
    this.hooks.argv.tap('sayMoney', money => {
      console.log(money)
    })
  }

  // 发布事件,同步串行执行订阅的事件
  call() {
    this.hooks.argv.call('hello')
  }
}

const loopen = new Loopen()
loopen.tap()
loopen.call()

// 结果

// hello
// sayName函数的返回值