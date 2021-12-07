const AsyncParallelHook = require('./sim/simAsyncParalleHook')

class AsyncLoopen {
  constructor() {
    this.hooks = {
      argv: new AsyncParallelHook(['name'])
    }
  }
  // 订阅异步处理函数
  tapAsync() {
    this.hooks.argv.tapAsync('sayName', (name, done) => {
      setTimeout(() => {
        console.log('sayName, async', name)
        done()
      }, 1000)
    })

    this.hooks.argv.tapAsync('sayMoney', (name, done) => {
      setTimeout(() => {
        console.log('sayMoney, async', name)
        done()
      }, 4000)
    })
  }

  tapPromise() {
    this.hooks.argv.tapPromise('sayName', name => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('sayName, promise', name)
          resolve('1')
        }, 1000)
      })
    })

    this.hooks.argv.tapPromise('sayMoney', name => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('sayMoney, promise', name)
          resolve('2')
        }, 3000)
      })
    })
  }

  // callAsync 异步并行触发订阅函数
  callAsync() {
    this.hooks.argv.callAsync('qiqingfu', () => {
      console.log('end!!!')
    })
  }

  callPromise() {
    this.hooks.argv.promise('qiqingfu')
      .then(res => {
        console.log('Async promise end!')
        console.log(res, 'res....')
      })
  }
}

const asyncloopen = new AsyncLoopen()
asyncloopen.tapAsync()
asyncloopen.callAsync()

// asyncloopen.tapPromise()
// asyncloopen.callPromise()