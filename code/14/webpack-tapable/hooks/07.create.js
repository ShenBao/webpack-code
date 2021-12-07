class AsyncParallelHook{
    constructor(args){ /* args -> ['name']) */
        this.tasks = [];
    }
    /** tap接收两个参数 name和fn */
    tap(name,fn){
        /** 订阅:将fn放入到this.tasks中 */
        this.tasks.push(fn);
    }
    start(...args){
        let index = 0;
        let finalCallBack = args.pop();
        /** 递归执行next()方法 直到执行所有task
         * 最后执行最终的回调finalCallBack()
         */
        let next = () => {
            /** 直到执行完所有task后 
             * 再执行最终的回调 finalCallBack()
             */
            if(index === this.tasks.length){
                return finalCallBack();
            }
            /** index++ 执行每一个task 并传入递归函数next
             * 执行完每个task后继续递归执行下一个task
             * next === cb，next就是每一步的cb回调
            */
            this.tasks[index++](...args,next);
        }
        /** 执行next() */
        next();
    }
}

let h = new AsyncParallelHook(['name']);

/** 订阅 */
h.tap('react',(name,cb)=>{
    setTimeout(()=>{
        console.log('react',name);
        cb();
    },1000);
});
h.tap('node',(name,cb)=>{
    setTimeout(()=>{
        console.log('node',name);
        cb();
    },1000);
});
/** 发布 */
h.start('end.',function(){
    console.log('最终的回调函数');
});