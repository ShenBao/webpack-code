const {
  AsyncSeriesBailHook
} = require('tapable')

const asyncSeriesBailHook = new AsyncSeriesBailHook(['name', 'age', 'fuck'])


// 异步串行钩子
asyncSeriesBailHook.tapAsync('1', (data, done) => {
  setTimeout(() => {
    console.log('1', data)
    done(false)
  }, 1000)
})

asyncSeriesBailHook.tapAsync('2', (data, done) => {
  setTimeout(() => {
    console.log('2', data)
    done(false)
  },2000)
})

console.time('times')

asyncSeriesBailHook.callAsync('qiqingfu', () => {
  console.log('end..')
  console.timeEnd('times')
})