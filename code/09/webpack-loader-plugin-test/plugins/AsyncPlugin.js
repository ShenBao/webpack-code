class AsyncPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync("AsyncPlugin", (compliation, cb) => {
            setTimeout(() => {
                console.log('等一下，文件发射出来了');
                cb();
            }, 1000)
        });
        compiler.hooks.emit.tapPromise("AsyncPlugin", (compliation) => {
            return new Promise((reslove, reject) => {
                setTimeout(() => {
                    console.log('在等1秒')
                    reslove();
                }, 1000);
            });
        });
    }
}

module.exports = AsyncPlugin;