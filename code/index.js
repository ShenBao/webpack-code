const fs = require('fs');

let strList = `# webpack-code

webpack 学习存档
`;

fs.readdirSync('./').map((dirname) => {
  if (fs.statSync(`./${dirname}`).isDirectory()) {
    strList = `
${strList}

## ${dirname}
`;
    fs.readdirSync(`./${dirname}`).map((subDirame) => {
      if (fs.statSync(`./${dirname}/${subDirame}`).isDirectory()) {
        strList = `${strList}
- [${subDirame}](${encodeURIComponent(`./${dirname}/${subDirame}`)})`;
      }
    });
  }
});

strList = `${strList}

## More links

- [GitHub Home](https://github.com/ShenBao)
- [Blog Home](https://shenbao.github.io)
- [About Me](https://shenbao.github.io/about/)
`

console.log(strList);
fs.writeFile(
  './strList.md',
  strList,
  {encoding: 'utf8'},
  (err) => {
      console.log(err);
  }
);
