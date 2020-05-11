/**
 * 如果订阅的事件处理函数有返回值,且返回的不为undefind,那么就终止并行后面的处理函数的执行。
 */

const SyncBailHook = require('./sim/simSyncBailHook')

class Loopen {
  constructor() {
    this.hooks = {
      argv: new SyncBailHook(['name'])
    }
  }

  // 订阅事件
  tap() {
    this.hooks.argv.tap('sayName', name => {
      console.log(name, 'name')
      return null   // 这个函数执行的返回值不为 null,下面sayMoney事件处理函数不执行
    })
    this.hooks.argv.tap('sayMoney', money => {
      console.log(money, 'money')
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