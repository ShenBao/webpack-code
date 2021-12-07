const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');
// 把外链标签 变成内联的标签
class InlineSourcePlugin {
  constructor(option) {
    this.reg = option.match; // 正则
  }
  processTag(tag, compilation) {
    let newTag;
    let url;
    if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
      newTag = {
        tagName: 'style',
        attributes: { type: 'text/css' }
      };
      url = tag.attributes.href;
    }

    if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
      newTag = {
        tagName: "script",
        attributes: { type: 'application/javascript' }
      };
      url = tag.attributes.src;
    }
    if (url) {
      newTag.innerHTML = compilation.assets[url].source(); // 文件的内容放置
      // console.log(newTag.innerHTML);
      delete compilation.assets[url]; // 删除掉 原有应该生成的资源
      return newTag;
    }
    return tag;
  }
  processTags(data, compilation) {
    // 处理引入标签的数据
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation));
    });
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation));
    });
    return { ...data, headTags, bodyTags };
  }
  apply(compiler) {
    // 要通过webpackPlugin来实现这个功能
    compiler.hooks.compilation.tap("InlineSourcePlugin", compliation => {
      HtmlWebpackPlugin.getHooks(compliation).alterAssetTagGroups.tapAsync(
        "alterPlugin",
        (data, cb) => {
          cb(null, this.processTags(data, compliation));
        }
      );
    });
  }
}

module.exports = InlineSourcePlugin;