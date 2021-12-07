const {
  AsyncSeriesHook
} = require('tapable')

class Loopen {
  constructor() {
    this.hooks = {
      argv: new AsyncSeriesHook(['name'])
    }
  }

  tapAsync() {
    this.hooks.argv.tapAsync('sayName', (name, done) => {
      setTimeout(() => {
        console.log('sayName', name)
        done()
      },2000)
    })

    this.hooks.argv.tapAsync('sayMoney', (name, done) => {
      setTimeout(() => {
        console.log('sayMoney', name)
        done()
      },3000)
    })
  }

  tapPromise() {
    this.hooks.argv.tapPromise('sayJob', name => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('sayJob', name)
          resolve('sayJob')
        }, 1000)
      })
    })

    this.hooks.argv.tapPromise('sayWhere', name => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('sayWhere', name)
          resolve('sayWhere')
        }, 2000)
      })
    })
  }

  promise() {
    this.hooks.argv.promise('qiqingfu')
      .then(res => {
        console.log('promise end!!')
        console.log(res)
      })
  }

  callAsync() {
    this.hooks.argv.callAsync('qiqingfu', () => {
      console.log('end!!!')
    })
  }
}

const loopen = new Loopen()
loopen.tapAsync()
loopen.callAsync()
// loopen.tapPromise()
// loopen.promise()