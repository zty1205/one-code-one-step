const fs = require('fs');
const path = require('path');

function count() {
  const md = path.resolve(__dirname, '../README.md');

  let content = fs.readFileSync(md, { encoding: 'utf-8' });

  let ms = content.match(/-\s\[.+\]\(.+\)/g);
  let countMap = {};
  ms.forEach((link) => {
    let mat = link.match(/\.\/(.+)\//);
    if (mat) {
      let key = mat[1];
      if (key in countMap) {
        countMap[key]++;
      } else {
        countMap[key] = 1;
      }
    }
  });
  console.log(`\n你战胜了:\n`);
  for (let k in countMap) {
    console.log(`> ${k}：${countMap[k]} 题`);
  }
  console.log(`\n你总共刷了 ${ms.length} 题`);
  console.log(`\n--- 继续加油！ ---\n`);
}

count();
