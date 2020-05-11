const { SyncHook } = require('tapable');

class Hook{
    constructor(){
        /** 1 生成SyncHook实例 */
        this.hooks = new SyncHook(['name']);
    }
    tap(){
        /** 2 注册监听函数 */
        this.hooks.tap('node',function(name){
            console.log('node',name);
        });
        this.hooks.tap('react',function(name){
            console.log('react',name);
        });
    }
    start(){
        /** 3出发监听函数 */
        this.hooks.call('call end.');
    }
}

let h = new Hook();

h.tap();/** 类似订阅 */
h.start();/** 类似发布 */