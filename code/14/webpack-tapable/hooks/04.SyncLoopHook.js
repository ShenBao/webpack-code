const { SyncLoopHook } = require('tapable');

class Hook{
    constructor(){
        /** 定义一个index */
        this.index = 0;
        this.hooks = new SyncLoopHook(['name']);
    }
    tap(){
        /** 箭头函数 绑定this */
        this.hooks.tap('node',(name) => {
            console.log('node',name);
            /** 当不满足条件时 会循环执行该函数 
             * 返回值为udefined时 终止该循环执行
            */
            return ++this.index === 5?undefined:'学完5遍node后再学react';
        });
        this.hooks.tap('react',(data) => {
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