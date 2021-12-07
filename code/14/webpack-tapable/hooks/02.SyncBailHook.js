const { SyncBailHook } = require('tapable');

class Hook{
    constructor(){
        this.hooks = new SyncBailHook(['name']);
    }
    tap(){
        this.hooks.tap('node',function(name){
            console.log('node',name);
            /** 此处return了一个非undefined
             *  代码到这里就不会继续执行余下的钩子
             */
            return 1;
        });
        this.hooks.tap('react',function(name){
            console.log('react',name);
        });
    }
    start(){
        this.hooks.call('call end.');
    }
}

let h = new Hook();

h.tap();
h.start();
