const fs = require('fs');
const path = require('path');
const { FILE_TEMPLATE } = require('./config');
const Log = require('./log');

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function isHttpLink(url) {
  return /^http/.test(url);
}

function getTemplate(ext) {
  return FILE_TEMPLATE[ext] || '';
}

function buildTemplate(ext, obj) {
  let tem = getTemplate(ext);
  for (let k in obj) {
    tem = tem.replace(`#${k}#`, obj[k]);
  }
  return tem;
}

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

function buildFileName(name, dist, ext) {
  return path.resolve(__dirname, `../${dist}/${name}.${ext}`);
}

function writeCodeFile(file, template) {
  Log.BuildFileStart(file);
  fs.writeFileSync(file, template, { encoding: 'utf-8' });
  Log.BuildFileEnd();
}

function writeMD(name, dist, ext) {
  Log.MDStart();

  const mdContent = fs.readFileSync(path.resolve(__dirname, '../README.md'), { encoding: 'utf-8' });
  const regexp = new RegExp(`- (.*)${dist}/(.*)\.[${Object.keys(FILE_TEMPLATE).join('|')}]\\)`, 'g');
  const matchRes = mdContent.match(regexp);
  if (!matchRes) return;
  const numList = matchRes.map(getNumberByName);
  const curNum = getNumberByName(name);
  const idx = findIndex(curNum, numList);

  const lastHtml = matchRes[idx];
  const link = buildMdLink(name, dist, ext);
  const newContent = mdContent.replace(lastHtml, `${lastHtml}\n${link}`);
  fs.writeFileSync(path.resolve(__dirname, '../README.md'), newContent, { encoding: 'utf-8' });

  Log.MDEnd();

  return {
    link,
    curNum
  };
}

function buildGitSH(files = [], dist) {
  Log.SHStart();

  let content = `git add README.md\n`;
  let num = `feat: ${dist}`;
  files.forEach((f) => {
    content += `git add ${f.file}\n`;
    num += ` ${f.curNum}`;
  });
  content += `git commit -m '${num}'\n`;
  content += `git push`;
  fs.writeFileSync(path.resolve(__dirname, './deploy.sh'), content, { encoding: 'utf-8' });

  Log.SHEnd();
}

module.exports = {
  sleep,
  isHttpLink,
  buildTemplate,
  buildFileName,
  writeMD,
  writeCodeFile,
  buildGitSH
};
