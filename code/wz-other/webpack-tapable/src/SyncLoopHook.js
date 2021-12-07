/*
* SyncLoopHook 同步串行执行, 如果函数的返回值为 true,则重复执行。直到返回值为 undefine表示继续向下执行
* */

const SyncLoopHook = require('./sim/simSyncLoopHook')

class Loopen {
  constructor() {
    this.total1 = 0;
    this.total2 = 0
    this.hooks = {
      argv: new SyncLoopHook(['name'])
    }
  }

  tap() {
    // 检测执行
    this.hooks.argv.tap('loop', () => {
      console.log('每次都要从头执行')
    })

    this.hooks.argv.tap('sayName', name => {
      console.log('total1', this.total1)
      return this.total1++ < 2 ? true : undefined
    })

    this.hooks.argv.tap('sayMoney', name => {
      console.log('total2', this.total2)
      return this.total2++ < 2 ? true : undefined
    })

    this.hooks.argv.tap('end', () => {
      console.log('end')
    })
  }

  call() {
    this.hooks.argv.call('begin')
  }
}

const loopen = new Loopen()
loopen.tap()
loopen.call()