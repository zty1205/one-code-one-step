const fs = require('fs');

const root = process.cwd();
const files = ['algorithm', 'designMode', 'leetCode', 'programming', 'python', '剑指67', '剑指第二版', '经典-150'];

// 统计文件夹下的文件数量
function main() {
  files.forEach((f) => {
    const distCode = `${root}/${f}`;
    fs.readdir(distCode, {}, (err, files) => {
      if (err) {
        console.log('readdir err = ', err);
        return;
      }
      console.log(`files = ${f} : `, files.length);
    });
  });
}

main();
