let { AsyncSeriesWaterfallHook} = require('tapable');
// 作业写这两个方法 AsyncSeriesWaterfallHook  tapAsync tapPromise
let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('第一个',function (name,cb) {
  setTimeout(() => {
    console.log(1);
    cb(null,'数据');
  }, 2000);
})
hook.tapAsync('第二个', function (data,data1) {
  setTimeout(() => {
    console.log(data);
    console.log(data1);
    cb(null)
  }, 2000);
});
hook.callAsync('',()=>{ // 这里需要传递一个参数
  console.log('ok')
})