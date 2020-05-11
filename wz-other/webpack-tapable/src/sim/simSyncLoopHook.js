'use strict'

/*
*   模拟 SyncLoopHook 的简单实现
*   如果订阅的函数返回值为 true, 就重复执行这个函数。执行方式是执行缓存的每一个订阅函数
* */

class SyncLoopHook {
  constructor(options) {
    this.options = options
    this.hooks = []
  }

  tap(name, callback) {
    this.hooks.push(callback)
  }

  call(...args) {
    let ret, i = 0
    for (i; i < this.hooks.length; i++) {
      do {
        ret = this.hooks[i](...args)
      } while (ret === true || ret !== undefined)
    }
  }
}

module.exports = SyncLoopHook