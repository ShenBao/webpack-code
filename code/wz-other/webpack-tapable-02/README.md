# 1. webpack的插件机制
在具体介绍webpack内置插件与钩子可视化工具之前，我们先来了解一下webpack中的插件机制。 webpack实现插件机制的大体方式是：
```
创建 - webpack在其内部对象上创建各种钩子；
注册 - 插件将自己的方法注册到对应钩子上，交给webpack；
调用 - webpack编译过程中，会适时地触发相应钩子，因此也就触发了插件的方法。
```
# 2.tapable用法
Webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，webpack中最核心的负责编译的Compiler和负责创建bundle的Compilation都是Tapable的实例
```
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } = require("tapable");
```
# 3. SyncHook
串行同步执行,不关心返回值
```
//let {SyncHook}=require('tapable');
class SyncHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call() {
        this.tasks.forEach(task=>task(...arguments));
    }
}
let queue = new SyncHook(['name']);
queue.tap('1',function(name){
  console.log(name,1);
});
queue.tap('2',function(name){
  console.log(name,2);
});
queue.tap('3',function(name){
  console.log(name,3);
});
queue.call('zfpx');
```
# 4. SyncBailHook
串行同步执行，有一个返回值不为null则跳过剩下的逻辑
```
//let {SyncBailHook}=require('tapable');
class SyncBailHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call() {
        // for (let i=0;i<this.tasks.length;i++){
        //     let ret=this.tasks[i](...arguments);
        //     if (ret)
        //         break;
        // }
        let i=0,ret;
        do {
            ret=this.tasks[i++](...arguments);
        } while (!ret);
    }
}
let queue = new SyncBailHook(['name']);
queue.tap('1',function(name){
  console.log(name,1);
  return 'Wrong';
});
queue.tap('2',function(name){
  console.log(name,2);
});
queue.tap('3',function(name){
  console.log(name,3);
});
queue.call('tian');
```
# 5. SyncWaterfallHook
```
class SyncWaterfallHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call() {
        let [first,...tasks]=this.tasks;
        tasks.reduce((ret,task)=>task(ret),first(...arguments));

        //this.tasks.reduce((a,b) => (...args) => b(a(...args)))(...arguments);
    }
}
let queue = new SyncWaterfallHook(['name']);
queue.tap('1',function(name,age){
  console.log(name,age,1);
  return 1;
});
queue.tap('2',function(data){
    console.log(data,2);
    return 2;
});
queue.tap('3',function(data){
  console.log(data,3);
});
queue.call('zfpx',9);
```
# 6. SyncLoopHook 
监听函数返回true表示继续循环，返回undefine表示结束循环
```
//let {SyncHook}=require('tapable');
class SyncLoopHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(...args) {    
        this.tasks.forEach(task => {
            let ret=true;
            do {
                ret = task(...args);
            }while(ret == true || !(ret === undefined))
        });
    }
}
let queue = new SyncLoopHook(['name']);
let count = 0;
queue.tap('1',function(name){
    console.log(count++);
    if(count==3){
        return;
    }else{
        return true;
    }
});
queue.call('zfpx');
```
# 7. AsyncParallelHook
异步并行执行钩子
## 7.1 tap
```
//let {AsyncParallelHook}=require('tapable');
class AsyncParallelHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        this.tasks.forEach(task => task(...args));
        callback();
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
7.2 tapAsync
```
//let {AsyncParallelHook}=require('tapable');
class AsyncParallelHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,length = this.tasks.length;
        function done(err) {
            if (++i == length) {
                callback(err);
            }
        }
        this.tasks.forEach(task => {
            task(...args,done);
        });
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    setTimeout(function(){
        console.log(1);
        callback();
    },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
## 7.3 tapPromise
```
//let {AsyncParallelHook}=require('tapable');
class AsyncParallelHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
        let promises = this.tasks.map(task => task());
        return Promise.all(promises);
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1);
            resolve();
        },1000)
    });

});
queue.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(()=>{
    console.timeEnd('cost');
})
```
# 8. AsyncParallelBailHook
带保险的异步并行执行钩子
## 8.1 tap
```
//let {AsyncParallelBailHook} = require('tapable');
class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        for (let i=0;i<this.tasks.length;i++){
            let ret=this.tasks[i](...args);
            if (ret) {
                return callback(ret);
            }
        }
    }
}
let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
    return "Wrong";
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
## 8.2 tapAsync
```
//let {AsyncParallelBailHook} = require('tapable');

class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let finalCallback=args.pop();
        let count=0,total=this.tasks.length;
        function done(err) {
            if (err) {
                return finalCallback(err);
            } else {
                if (++count == total) {
                    return finalCallback();
                }
            }
        }
        for (let i=0;i<total;i++){
            let task=this.tasks[i];
            task(...args,done);
        }
    }
}
let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    console.log(1);
    callback('Wrong');
});
queue.tapAsync('2',function(name,callback){
    console.log(2);
    callback();
});
queue.tapAsync('3',function(name,callback){
    console.log(3);
    callback();
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
## 8.3 tapPromise
```
//let {AsyncParallelBailHook} = require('tapable');

class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
        let args=Array.from(arguments);
        let promises = this.tasks.map(task => task(...arguments));
        return Promise.all(promises);
    }
}
let queue = new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1);
            resolve();
        },1000)
    });
});
queue.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            reject();
        },2000)
    });
});

queue.tapPromise('3',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});

queue.promise('zfpx').then(()=>{
    console.timeEnd('cost');
},err => {
    console.error(err);
    console.timeEnd('cost');
})
```
# 9. AsyncSeriesHook
异步串行钩子
## 9.1 tap
```
let {AsyncSeriesHook} = require('tapable');
class AsyncSeriesHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        for (let i=0;i<total;i++){
            let task=this.tasks[i];
            task(...args,done);
        }
    }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
## 9.2 tapAsync
```
class AsyncSeriesBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args = Array.from(arguments);
        let finalCallback = args.pop();
        let index = 0, length = this.tasks.length;
        let next = () => {
            let task = this.tasks[index++];
            if (task) {
                task(...args, next);
            } else {
                finalCallback();
            }
        }
        next();
    }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
   },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
## 9.3 tapPromise
```
class AsyncSeriesHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
         //first是第一个函数， tasks是剩下的函数
        let [first, ...tasks] = this.tasks;
        return tasks.reduce((a, b) => {
            return a.then(() => b());
        }, first(...args));
    }
}
let queue=new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
   return new Promise(function(resolve){
       setTimeout(function(){
           console.log(1);
           resolve();
       },1000)
   });
});
queue.tapPromise('2',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(data=>{
    console.log(data);
    console.timeEnd('cost');
});
```
# 10. AsyncSeriesBailHook
## 10.1 tap
```
let {AsyncSeriesBailHook} = require('tapable');
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
    return "Wrong";
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
## 10.2 tabAsync
```
//let {AsyncSeriesBailHook}=require('tapable');
class AsyncSeriesBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,size = this.tasks.length;
        let next=(err) => {
            if (err) return  callback(err);
            let task=this.tasks[i++];
            task?task(...args,next):callback();
        }
        next();
    }
}
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
       callback('wrong');
   },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
## 10.3 tapPromise
```
let {AsyncSeriesBailHook} = require('tapable');
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
   return new Promise(function(resolve,reject){
       setTimeout(function(){
           console.log(1);
           //resolve();
           reject();
       },1000)
   });
});
queue.tapPromise('2',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(err=>{
    console.log(err);
    console.timeEnd('cost');
},err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
# 11. AsyncSeriesWaterfallHook
## 11.1 tap
```
let {AsyncSeriesWaterfallHook} = require('tapable');
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tap('1',function(name,callback){
    console.log(1);
});
queue.tap('2',function(data){
    console.log(2,data);
});
queue.tap('3',function(data){
    console.log(3,data);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
## 11.2 tapAsync
```
//let {AsyncSeriesBailHook}=require('tapable');
class AsyncSeriesWaterfallHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,size = this.tasks.length;
        let next=(err,data) => {
            if (err) return  callback(err);
            let task=this.tasks[i++];
            if (task) {
                if (i==0) {
                    task(...args,next);
                } else {
                    task(data,next);
                }

            } else {
                callback(err,data);
            }
        }
        next();
    }
}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
       callback(null,1);
   },1000)
});
queue.tapAsync('2',function(data,callback){
    setTimeout(function(){
        console.log(2);
        callback(null,2);
    },2000)
});
queue.tapAsync('3',function(data,callback){
    setTimeout(function(){
        console.log(3);
        callback(null,3);
    },3000)
});
queue.callAsync('zfpx',(err,data)=>{
    console.log(err,data);
    console.timeEnd('cost');
});
## 11.3 tapPromise
```
let {AsyncSeriesWaterfallHook} = require('tapable');
class AsyncSeriesWaterfallHook {
    constructor() {
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        //first是第一个函数， tasks是剩下的函数
        let [first, ...tasks] = this.tasks;
        return tasks.reduce((a, b) => {
            return a.then((data) => b(data));
        }, first(...args));
    }
}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(name, 1);
            resolve(1);
        }, 1000);
    });
});
queue.tapPromise('2', function (data) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(data, 2);
            resolve(2);
        }, 2000);
    });
});
queue.tapPromise('3', function (data) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(data, 3);
            resolve(3);
        }, 3000);
    });
});
queue.promise('zfpx').then(err => {
    console.timeEnd('cost');
});
```
# 12. tapable
```
const {Tapable,SyncHook} = require("tapable");
const t = new Tapable();
t.hooks = {
    myHook: new SyncHook()
};
let called = 0;
t.plugin("my-hook", () => called++);
t.hooks.myHook.call();
t.plugin("my-hook", () => called += 10);
t.hooks.myHook.call();
console.log(called);
```
```
