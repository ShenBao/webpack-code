const chalk = require('chalk')
var slog = require('single-line-log');

class RuxConsolePlugin {
    constructor(options){
       this.options = options
    }
    apply(compiler){
        /**
         * Monitor file change
         */
        compiler.hooks.watchRun.tap('RuxConsolePlugin', (watching) => {
            const changeFiles = watching.watchFileSystem.watcher.mtimes
            for(let file in changeFiles){
                console.log(chalk.green('当前改动文件：'+ file))
            }
        })
        /**
         *  before a new compilation is created.
         */
        compiler.hooks.compile.tap('RuxConsolePlugin',()=>{
            this.beginCompile()
        })
        /**
         * Executed when the compilation has completed.
         */
        compiler.hooks.done.tap('RuxConsolePlugin',()=>{
            this.timer && clearInterval( this.timer )
            console.log( chalk.yellow(' 编译完成') )
        })
    }
    beginCompile(){
       const lineSlog = slog.stdout
       let text  = '开始编译：'
       this.timer = setInterval(()=>{
          text +=  '█'
          lineSlog( chalk.green(text))
       },50)
    }
}


module.exports = RuxConsolePlugin