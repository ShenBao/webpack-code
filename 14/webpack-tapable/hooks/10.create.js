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
        /** 2 利用reduce方法 累计执行
         * 它最终返回的是一个Promsie
         */
        return others.reduce((l,n)=>{
            return l.then((data)=>{
                /** 3 将data传给下一个task 即可 */
                return n(data);
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
            resolve('promise-传递给下一步的结果');
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