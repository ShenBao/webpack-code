const { AsyncParallelHook } = require('tapable');

class Hook{
    constructor(){
        this.hooks = new AsyncParallelHook(['name']);
    }
    tap(){
        /** 异步的注册方法是tapAsync() 
         * 并且有回调函数cb.
        */
        this.hooks.tapAsync('node',function(name,cb){
            setTimeout(()=>{
                console.log('node',name);
                cb();
            },1000);
        });
        this.hooks.tapAsync('react',function(name,cb){
            setTimeout(()=>{
                console.log('react',name);
                cb();
            },1000);
        });
    }
    start(){
        /** 异步的触发方法是callAsync() 
         * 多了一个最终的回调函数 fn.
        */
        this.hooks.callAsync('call end.',function(){
            console.log('最终的回调');
        });
    }
}

let h = new Hook();

h.tap();/** 类似订阅 */
h.start();/** 类似发布 */