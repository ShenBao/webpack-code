'use strict'

// 简单模拟 tapable SyncHook的实现

class SyncHook {
  constructor(options) {
    this.options = options
    this.hooks = []  // 缓存订阅的事件
  }

  /**
   * 订阅事件
   * @param name
   * @param callback
   */
  tap(name, callback) {
    this.hooks.push(callback)
  }

  /**
   * 发布事件
   * @param args
   */
  call(...args) {
    this.hooks.forEach(task => task(...args))
  }
}

module.exports = SyncHook