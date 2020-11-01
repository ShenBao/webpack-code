var fileName = 'README.md';
var repName = 'webpack-notes';
var basePath = `https://github.com/ShenBao/${repName}/blob/master`;
basePath = '';

var desc = `
webpack 学习笔记

- [webpack 文档](https://webpack.js.org/)
- [webpack 中文文档](https://webpack.docschina.org/)
- [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack)
`;

var endDesc = `
## More links

- [GitHub Home](https://github.com/ShenBao)
- [Blog Home](https://shenbao.github.io)
- [About Me](https://shenbao.github.io/about/)
`;

var fs = require ('fs');
var path = require ('path');

function readFileList (dir, filesList = []) {
  const files = fs.readdirSync (dir);
  files.forEach ((item, index) => {
    var fullPath = path.join (dir, item);
    const stat = fs.statSync (fullPath);
    if (stat.isDirectory ()) {
      var nextPath = path.join (dir, item);
      if (
        nextPath.includes ('oldDocs') ||
        nextPath.includes ('code') ||
        nextPath.includes ('img') ||
        nextPath.includes ('.git') ||
        nextPath.includes ('node_modules') ||
        nextPath.includes('webpack.Link') ||
        nextPath.includes('15. 其他) ||
      ) {
      } else {
        filesList.push (
          {},
          {
            name: item,
            path: fullPath.replace (__dirname, '').replace (/\\/g, '/') +
              '/README.md',
          }
        );
        readFileList (path.join (dir, item), filesList);
      }
    } else {
      var extname = path.extname (item);
      if (
        !(item.includes ('webpack-Links') || item.includes ('webpack-Books')) &&
        (extname == '.md' && item != 'README.md')
      ) {
        var name = item.replace ('.md', '');
        var arr = name.split ('.');
        if (/^[0-9]+[\s\S]*$/.test (item)) {
          arr.shift ();
        }
        name = arr.join ().replace (/(^\s*)|(\s*$)/g, '');
        var itemPath = fullPath.replace (__dirname, '').replace (/\\/g, '/');
        var obj = {
          name: name,
          path: itemPath,
        };
        filesList.push (obj);
      }
    }
  });
  return filesList;
}

var filesList = [];
readFileList (__dirname, filesList);

console.log (JSON.stringify (filesList, null, 4));

var str = '';
filesList.forEach ((item, index) => {
  var {name, path} = item;
  if (!name) {
    str += `\n`;
    return;
  }
  var enPath = encodeURIComponent (path);
  if (item.path.includes ('README.md')) {
    console.log (``);
    var sl = item.path.split ('/').length - 1;
    if (sl === 2) {
      str += `## [${name}](${basePath}${enPath})\n\n`;
    } else if (sl === 3) {
      str += `### ${name}\n\n`;
    } else if (sl === 4) {
      str += `#### ${name}\n\n`;
    }
  } else {
    str += `1. [${name}](${basePath}${enPath})\n`;
  }
  console.log (`[${name}](${basePath}${path})`);
});

if (!basePath.startsWith ('http')) {
  str += endDesc;
}

var content = `# ${repName}\n`;
if (!basePath.startsWith ('http')) {
  content += desc;
}
fs.writeFileSync (`./${fileName}`, content);
fs.writeFile (
  `./${fileName}`,
  str,
  {flag: 'a', encoding: 'utf-8', mode: '0666'},
  function (err) {
    if (err) {
      console.log ('\n======== error ========');
      throw err;
    }
    console.log ('\n======== success ========');
  }
);
