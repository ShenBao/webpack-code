const SyncHook = require('./sim/simSyncHook')

class Loopen {
  constructor() {
    this.hooks = {
      argv: new SyncHook(['name'])
    }
  }

  // 订阅事件
  tap() {
    this.hooks.argv.tap('sayName', name => {
      console.log(name)
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