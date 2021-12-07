let loaderUtils = require('loader-utils');
function loader(source) {
    let filename = loaderUtils.interpolateName(this, '[hash:10].[ext]', { content: source });
    this.emitFile(filename, source); // 发射文件
    return `module.exports="${filename}"`;
}
// 2进制模式
loader.raw = true;
module.exports = loader;