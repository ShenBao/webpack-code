class SyncWaterFallHook{
    constructor(args){
        this.tasks = [];
    }
    tap(name,fn){
        this.tasks.push(fn);
    }
    start(...args){
        /** 解构 拿到tasks中的第一个task -> first */
        let [first, ...others] = this.tasks;
        /** 利用reduce() 累计执行 
         * 首先传入第一个 first 并执行
         * l是上一个task n是当前task
         * 这样满足了 下一个函数依赖上一个函数的执行结果
        */
        others.reduce((l,n)=>{
            return n(l);
        },first(...args));
    }
}

let h = new SyncWaterFallHook(['name']);

/** 订阅 */
h.tap('react',(name)=>{
    console.log('react',name);
    return '我是第一步返回的值';
});
h.tap('node',(name)=>{
    console.log('node',name);
});
/** 发布 */
h.start('end.');