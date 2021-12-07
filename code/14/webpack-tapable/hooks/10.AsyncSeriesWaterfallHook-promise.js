const { AsyncSeriesWaterfallHook } = require('tapable');

class Hook{
    constructor(){
        this.hooks = new AsyncSeriesWaterfallHook(['name']);
    }
    tap(){
        this.hooks.tapPromise('node',function(name){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    console.log('node',name);
                    /** 在resolve中把结果传给下一步 */
                    resolve('返回给下一步的结果');
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
        this.hooks.promise('call end.').then(function(){
            console.log('最终的回调');
        });
    }
}

let h = new Hook();

h.tap();
h.start();