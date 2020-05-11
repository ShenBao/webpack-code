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
        /** 通过pop()获取到最后一个参数 
         * finalCallBack() 最终的回调
         */
        let finalCallBack = args.pop();
        /** 箭头函数绑定this */
        let done = () => {
            /** 执行done() 每次index+1 */
            index++;
            if(index === this.tasks.length){
                /** 执行最终的回调 */
                finalCallBack();
            }
        }
        this.tasks.forEach((task)=>{
            /** 执行每个task，传入我们给定的done回调函数 */
            task(...args,done);
        });
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