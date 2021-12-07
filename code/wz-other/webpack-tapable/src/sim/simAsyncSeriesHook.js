/**
 *  AsyncSeriesHook 异步串行执行, 订阅函数: tapAsync tapPromise  发布函数: callAsync promise
 */

'use strict'

class AsyncSeriesHook {
  constructor(options) {
    if (Array.isArray(options)) {
      this.options = options
    } else {
      new Error(`${options} 应该是一个数组类型的参数`)
    }
    this.asyncHooks = []
    this.promiseHook = []
  }

  tapASync(name, callback) {
    this.asyncHooks.push(callback)
  }

  async callAsync(...args) {
   let finalCallback = args.pop()
    let i = 0;
    let next = () => {
      let task = this.asyncHooks[i++];
      task ? task(...args, next) : finalCallback();
    };
    next();
  }

  // promise 异步串行
  tapPromise(name, callback) {
    this.promiseHook.push(callback)
  }

  async promise(...args) {
    let hooks = []
    for (let hook of this.promiseHook) {
      hooks.push(await hook(...args))
    }
    return Promise.all(hooks)
  }
}

module.exports = AsyncSeriesHook