const { SyncWaterfallHook } = require('tapable');

class Hook{
    constructor(){
        this.hooks = new SyncWaterfallHook(['name']);
    }
    tap(){
        this.hooks.tap('node',function(name){
            console.log('node',name);
            /** 此处返回的值作为第二步的结果 */
            return '第一步返回的结果';
        });
        this.hooks.tap('react',function(data){
            /** 此处data就是上一步return的值 */
            console.log('react',data);
        });
    }
    start(){
        this.hooks.call('callend.');
    }
}

let h = new Hook();

h.tap();
h.start();