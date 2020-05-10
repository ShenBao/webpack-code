const fs = require ('fs');
const path = require ('path');

//目标目录
function loadTree (options) {
  let {target, deep} = options;
  let prev = new Array (deep).join (' |');
  // 前面| 字符串

  let dirinfo = fs.readdirSync (target);
  let files = [];
  let dirs = [];
  //保存文件或者是文件夹

  //遍历将文件或者文件夹分开存储
  for (let i = 0; i < dirinfo.length; i++) {
    // console.log(path.join(target,dirinfo[i]))
    let state = fs.statSync (path.join (target, dirinfo[i]));
    if (state.isFile ()) {
      files.push (dirinfo[i]);
    } else {
      dirs.push (dirinfo[i]);
    }
  }

  // 文件夹操作
  for (let i = 0; i < dirs.length; i++) {
    console.log (`${prev} ├── ${dirs[i]}`);
    // 递归
    let nextPath = path.join (target, dirs[i]);
    let nextdeep = deep + 1;
    // 下一级的 文件目录 以及层级
    loadTree ({
      target: nextPath,
      deep: nextdeep,
    });
    // 递归调用
  }
  // 文件操作
  for (let i = files.length - 1; i >= 0; i--) {
    if (i === 0) {
      console.log (`${prev} └──  ${files[i]}`);
    } else {
      console.log (`${prev} ├──  ${files[i]}`);
    }
  }
}

loadTree ({
  target: path.join (__dirname, '../'),
  deep: 1,
});
