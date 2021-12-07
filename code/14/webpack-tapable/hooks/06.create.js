class SyncHook{
    constructor(args){ 
        this.tasks = [];
    }
    tapPromise(name,fn){
        this.tasks.push(fn);
    }
    promise(...args){
        /** 利用map方法返回一个新数组的特性 */
        let tasks = this.tasks.map((task)=>{
            /** 每一个task都是一个Promise */
            return task(...args);
        });
        /** Promise.all() 等待所有Promise都执行完毕 */
        return Promise.all(tasks);
    }
}

let h = new SyncHook(['name']);

/** 订阅 */
h.tapPromise('react',(name)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('react',name);
            resolve();
        },1000);
    });
});
h.tapPromise('node',(name)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('node',name);
            resolve();
        },1000);
    });
});
/** 发布 */
h.promise('end.').then(function(){
    console.log('最终的回调函数');
});