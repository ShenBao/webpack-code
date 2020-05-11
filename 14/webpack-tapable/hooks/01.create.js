class SyncHook{
    constructor(args){ /* args -> ['name']) */
        this.tasks = [];
    }
    /** tap接收两个参数 name和fn */
    tap(name,fn){
        /** 订阅:将fn放入到this.tasks中 */
        this.tasks.push(fn);
    }
    start(...args){/** 接受参数 */
        /** 发布:将this.taks中的fn依次执行 */
        this.tasks.forEach((task)=>{
            task(...args);
        });
    }
}

let h = new SyncHook(['name']);

/** 订阅 */
h.tap('react',(name)=>{
    console.log('react',name);
});
h.tap('node',(name)=>{
    console.log('node',name);
});
/** 发布 */
h.start('end.');