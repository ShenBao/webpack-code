const {
  AsyncParallelBailHook
} = require('tapable')


const asyncParallelBailHook = new AsyncParallelBailHook(['name'])

console.time('cost')
asyncParallelBailHook.tapAsync('1', function (name, callback) {
    setTimeout(function () {
        console.log(1, name)
        return null;// 最后的回调就不会调用了
        callback()
    }, 1000)
    // callback()
})

asyncParallelBailHook.tapAsync('2', function (name, callback) {
    setTimeout(function () {
        console.log(2, name)
        callback()
    }, 2000)
    // callback()
})

asyncParallelBailHook.tapAsync('3', function (name, callback) {
    setTimeout(function () {
        console.log(3, name)
        callback()
    }, 3000)
})

asyncParallelBailHook.callAsync('liu', () => {
    console.log('over')
  console.timeEnd('cost')
});