class SyncHook{
    constructor(args){ 
        this.tasks = [];
    }
    tap(name,fn){
        this.tasks.push(fn);
    }
    start(...args){
        let index = 0;
        let result;
        /** 利用do while先执行一次的特性 */
        do{
            /** 拿到每一次函数的返回值 result */
            result = this.tasks[index++](...args);
            /** 如果返回值不为undefined或者执行完毕所有task 就中断循环 */
        }while(result === undefined && index < this.tasks.length);
    }
}

let h = new SyncHook(['name']);

h.tap('react',(name)=>{
    console.log('react',name);
    return 1;
});
h.tap('node',(name)=>{
    console.log('node',name);
});

h.start('end.');