class FileListPlugin {
  constructor (option) {
    this.filename = option.filename;
  }
  apply (compiler) {
    compiler.hooks.emit.tap ('FileListPlugin', compilation => {
      let assets = compilation.assets;
      let content = `# output file list\r\n\r\nfile     size\r\n\r\n`;
      Object.entries (assets).forEach (([filename, statObj]) => {
        content += `- ${filename}    ${(statObj.size () / 1024).toFixed (2)} KB\r\n`;
      });
      assets[this.filename] = {
        source () {
          return content;
        },
        size () {
          return content.length;
        },
      };
    });
  }
}

module.exports = FileListPlugin;
