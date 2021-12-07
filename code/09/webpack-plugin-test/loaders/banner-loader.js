const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const fs = require('fs');
function loader(source) {
    this.cacheable && this.cacheable();
    // this.cacheable(false);
    let options = loaderUtils.getOptions(this);
    let schema = {
        type: 'object',
        properties: {
            text: {
                type: 'string',
            },
            filename: {
                type: 'string'
            }
        }
    }
    validateOptions(schema, options, 'banner-loader');
    let cb = this.async();

    if (options.filename) {
        this.addDependency(options.filename); // 自动添加文件依赖
        fs.readFile(options.filename, 'utf-8', function (err, data) {
            cb(err, `/**${data}**/${source}`)
        })
    } else {
        cb(null, `/**${options.text}**/${source}`)
    }
    return source;
}

module.exports = loader;