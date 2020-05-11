class SyncWaterFallHook{
    constructor(args){
        this.tasks = [];
    }
    tap(name,fn){
        this.tasks.push(fn);
    }
    start(...args){
        let result;
        this.tasks.forEach((task)=>{
            /** 注意 此处do{}while()循环的是每个单独的task */
            do{
                /** 拿到每个task执行后返回的结果 */
                result = task(...args);
                /** 返回结果不是udefined时 会继续循环执行该task */
            }while(result !== undefined);
        });
    }
}

let h = new SyncWaterFallHook(['name']);
let total = 0;
/** 订阅 */
h.tap('react',(name)=>{
    console.log('react',name);
    return ++total === 3?undefined:'继续执行';
});
h.tap('node',(name)=>{
    console.log('node',name);
});
/** 发布 */
h.start('end.');