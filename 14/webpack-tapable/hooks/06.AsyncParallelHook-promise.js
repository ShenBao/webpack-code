const { AsyncParallelHook } = require('tapable');

class Hook{
    constructor(){
        this.hooks = new AsyncParallelHook(['name']);
    }
    tap(){
        /** 这里是Promsie写法 
         * 注册事件的方法为tapPromise 
        */
        this.hooks.tapPromise('node',function(name){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    console.log('node',name);
                    resolve();
                },1000);
            });
        });
        this.hooks.tapPromise('react',function(name){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    console.log('react',name);
                    resolve();
                },1000);
            });
        });
    }
    start(){
        /** 
         * promsie最终返回一个prosise 成功resolve时
         * .then即为最终回调
        */
        this.hooks.promise('call end.').then(function(){
            console.log('最终的回调');
        });
    }
}

let h = new Hook();

h.tap();/** 类似订阅 */
h.start();/** 类似发布 */