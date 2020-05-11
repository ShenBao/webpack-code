/*
* AsyncSeriesWaterfallHook 异步串行瀑布式
* */

const {
  AsyncSeriesWaterfallHook
} = require('tapable')

class Loopen {
  constructor() {
    this.hooks = {
      argv: new AsyncSeriesWaterfallHook(['namee'])
    }
  }

  tapAsync(name, callback) {
    this.hooks.argv.tapAsync('sayName', (name, cb) => {
      setTimeout(() => {
        console.log('sayName', name)
        cb(null, '这是sayName中传递来的')
      }, 1000)
    })

    this.hooks.argv.tapAsync('sayMoney', (data, cb) => {
      setTimeout(() => {
        console.log('sayMoney', data)
        cb(null)
      }, 2000)
    })
  }

  callAsync(...args) {
    this.hooks.argv.callAsync('qiqingfu', () => {
      console.log('end!!!')
    })
  }
}

const loopen = new Loopen()
loopen.tapAsync()
loopen.callAsync()