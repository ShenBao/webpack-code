class AsyncSeriesHook{
    constructor(args){ 
        this.tasks = [];
    }
    tapPromise(name,fn){
        this.tasks.push(fn);
    }
    promise(...args){
        /** 1 解构 拿到第一个first
         * first是一个promise
         */
        let [first, ...others] = this.tasks;
        /** 4 利用reduce方法 累计执行
         * 它最终返回的是一个Promsie
         */
        return others.reduce((l,n)=>{
            /** 1 下一步的执行依赖上一步的then */
            return l.then(()=>{
                /** 2 下一步执行依赖上一步结果 */
                return n(...args);
            });
        },first(...args));
    }
}

let h = new AsyncSeriesHook(['name']);

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