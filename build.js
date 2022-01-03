const fs = require('fs');
const path = require('path');

// 生成html 和 md link
const list = ['167. 两数之和 II - 输入有序数组', '168. Excel表列名称', '169. 多数元素'];

const html_template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>#title#</title>
  </head>
  <body>
    <script>

    </script>
  </body>
</html>
`;

function getNumberByName(name) {
  const ms = name.match(/(\d+)\.(.+)/);
  return ms ? +ms[1] : 0;
}

// 找到上一个html的下标
function findIndex(num, list = []) {
  let res = 0;
  while (num > list[res]) res++;
  return res ? res - 1 : 0;
}

function buildMdLink(name, dist) {
  return `- [${name}.html](./${dist}/${name}.html)`;
}

function build(str, dist) {
  let name = str.replace(/\s/g, '');
  const tem = html_template.replace(/#title#/, name);
  fs.writeFileSync(`./${dist}/${name}.html`, tem);

  const mdContent = fs.readFileSync(path.resolve(__dirname, './README.md'), { encoding: 'utf-8' });
  // console.log('mdContent = ', mdContent);
  const matchRes = mdContent.match(new RegExp(`- (.*)${dist}/(.*)\.html\\)`, 'g'));
  if (!matchRes) return;
  const numList = matchRes.map(getNumberByName);
  const curNum = getNumberByName(str);
  const idx = findIndex(curNum, numList);

  const lastHtml = matchRes[idx];
  // console.log('lastHtml = ', lastHtml);
  // console.log('newHtml = ', `${lastHtml}\n${buildMdLink(name, dist)}`);
  const newContent = mdContent.replace(lastHtml, `${lastHtml}\n${buildMdLink(name, dist)}`);
  // console.log('newContent = ', newContent);
  fs.writeFileSync(path.resolve(__dirname, './README.md'), newContent, { encoding: 'utf-8' });
}

function main() {
  list.map((s) => build(s, 'leetCode'));
}

main();
