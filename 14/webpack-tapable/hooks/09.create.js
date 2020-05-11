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
        /** 1 拿到最后的最终的回调 */
        let finalCallBack = args.pop();
        let next = (err,data) => {
            /** 拿到每个task */
            let task = this.tasks[index];
            /** 2 如果没传task 或者全部task都执行完毕
             * return 直接执行最终的回调finalCallBack()
             */
            if(!task) return finalCallBack();

            if(index === 0){
                /** 3 执行第一个task
                 * 并传递参数为原始参数args
                 */
                task(...args, next);
            }else{
                /** 4 执行处第二个外的每个task
                 * 并传递的参数 data
                 *  data ->‘传递给下一步的结果’
                 */
                task(data, next);
            }
            index++;
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
        cb(null,'传递给下一步的结果');
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