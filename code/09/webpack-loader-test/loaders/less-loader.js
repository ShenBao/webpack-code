const less = require('less');
function loader(source) {
    let css = "";
    less.render(source, function (err, r) {
        css = r.css;
    });
    return css;
}

module.exports = loader;
