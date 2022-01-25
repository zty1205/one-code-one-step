const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const open = require('open');

const NO_CODE_DIR = ['.git', 'node_modules', 'img', 'public', 'src'];

const NO_CODE_DIR_MAP = NO_CODE_DIR.reduce((pre, cur) => {
  pre[cur] = true;
  return pre;
}, {});

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
  const ms = name.match(/(\d+)/);
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
  const file = `./${dist}/${name}.${ext}`;
  fs.writeFileSync(file, tem);

  const mdContent = fs.readFileSync(path.resolve(__dirname, './README.md'), { encoding: 'utf-8' });
  const regexp = new RegExp(`- (.*)${dist}/(.*)\.[${Object.keys(TEMPLATE).join('|')}]\\)`, 'g');
  const matchRes = mdContent.match(regexp);
  if (!matchRes) return;
  const numList = matchRes.map(getNumberByName);
  const curNum = getNumberByName(str);
  const idx = findIndex(curNum, numList);

  const lastHtml = matchRes[idx];
  const link = buildMdLink(name, dist, ext);
  const newContent = mdContent.replace(lastHtml, `${lastHtml}\n${link}`);
  fs.writeFileSync(path.resolve(__dirname, './README.md'), newContent, { encoding: 'utf-8' });
  return {
    name,
    file,
    link,
    curNum
  };
}

function buildGitSH(files = [], dist) {
  let content = `git add README.md\n`;
  let num = `feat: ${dist}`;
  files.forEach((f) => {
    content += `git add ${f.file}\n`;
    num += ` ${f.curNum}`;
  });
  content += `git commit -m '${num}'\n`;
  content += `git push`;
  fs.writeFileSync(path.resolve(__dirname, './deploy.sh'), content, { encoding: 'utf-8' });
}

async function main() {
  const files = fs.readdirSync(__dirname);

  const codeDir = files
    .filter((file) => {
      const stat = fs.statSync(file);
      return stat.isDirectory();
    })
    .filter((file) => !NO_CODE_DIR_MAP[file]);

  inquirer
    .prompt([
      {
        type: 'input',
        message: '文件名，多个使用,分格',
        name: 'name',
        filter: function (val) {
          return val ? val.split(',') : undefined;
        },
        validate: function (val) {
          const done = this.async();
          if (!val) {
            done('请输入文件名');
            return;
          }
          done(null, true);
        }
      },
      {
        type: 'input',
        message: '文件后缀，默认html: ',
        name: 'ext',
        default: 'html',
        when: function (answer) {
          return answer.name;
        }
      },
      {
        type: 'list',
        message: '文件夹，默认leetCode：',
        name: 'dist',
        default: 'leetCode',
        choices: codeDir,
        when: function (answer) {
          return answer.name;
        }
      }
    ])
    .then(async (answer) => {
      const { name, ext, dist } = answer;
      const res = name.map((n) => build(n, dist, ext));
      if (res && res[0]) {
        await open(res[0].file, { allowNonzeroExitCode: true, background: true });
      }
      buildGitSH(res, dist);
      process.exit();
    });
}

main();
