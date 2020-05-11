const { AsyncSeriesWaterfallHook } = require('tapable');

class Hook{
    constructor(){
        this.hooks = new AsyncSeriesWaterfallHook(['name']);
    }
    tap(){
        this.hooks.tapAsync('node',function(name,cb){
            setTimeout(()=>{
                console.log('node',name);
                /** 第一次参数是err, 第二个参数是传递给下一步的参数 */
                cb(null,'第一步返回第二步的结果');
            },1000);
        });
        this.hooks.tapAsync('react',function(data,cb){
            /** 此回调要等待上一个回调执行完毕后才开始执行 
             *  并且 data 是上一步return的结果.
            */
            setTimeout(()=>{
                console.log('react',data);
                cb();
            },1000);
        });
    }
    start(){
        this.hooks.callAsync('call end.',function(){
            console.log('最终的回调');
        });
    }
}

let h = new Hook();

h.tap();
h.start();