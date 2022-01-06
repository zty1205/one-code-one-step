const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function getAnswer(ques) {
  return new Promise((resolve) => {
    rl.question(ques, (value) => {
      resolve(value);
    });
  });
}

// 生成文件 和 md link
const list = [];

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

const sql_template = `-- #title#\n\n`;

const TEMPLATE = {
  html: html_template,
  sql: sql_template
};

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

function buildMdLink(name, dist, ext) {
  return `- [${name}.${ext}](./${dist}/${name}.${ext})`;
}

function build(str, dist, ext) {
  let name = str.replace(/\s/g, '');
  const template = TEMPLATE[ext] || '';
  const tem = template.replace(/#title#/, name);
  fs.writeFileSync(`./${dist}/${name}.${ext}`, tem);

  const mdContent = fs.readFileSync(path.resolve(__dirname, './README.md'), { encoding: 'utf-8' });
  const regexp = new RegExp(`- (.*)${dist}/(.*)\.[${Object.keys(TEMPLATE).join('|')}]\\)`, 'g');
  const matchRes = mdContent.match(regexp);
  if (!matchRes) return;
  const numList = matchRes.map(getNumberByName);
  const curNum = getNumberByName(str);
  const idx = findIndex(curNum, numList);

  const lastHtml = matchRes[idx];
  const newContent = mdContent.replace(lastHtml, `${lastHtml}\n${buildMdLink(name, dist, ext)}`);
  fs.writeFileSync(path.resolve(__dirname, './README.md'), newContent, { encoding: 'utf-8' });
}

async function main() {
  const ext = await getAnswer(` File extension default html ? `);
  list.map((s) => build(s, 'leetCode', ext || 'html'));
  rl.close();
}

main();
