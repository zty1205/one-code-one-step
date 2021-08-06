const fs = require('fs');
const path = require('path');

const distCode = path.resolve(__dirname, './剑指67');

function runCode() {
  fs.readdir(distCode, {}, (err, files) => {
    if (err) {
      console.log('readdir err = ', err);
      return;
    }
    console.log('files = ', files);
    // - [实现一个 trim 方法](./programming/trim.html)
    const res = files
      .map((f) => `- [${f}](./剑指67/${f})`)
      .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]))
      .join('\r\n');
    console.log('res = ', res);
    // files.map((f) => {
    //   const p = `${distCode}/${f}`;
    //   fs.rename(p, p.replace(/\s/g, ''), () => {});
    // });
  });
}

function main() {
  runCode();
}

main();
