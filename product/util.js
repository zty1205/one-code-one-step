const fs = require('fs');
const path = require('path');
const { FILE_TEMPLATE } = require('./config');
const Log = require('./log');
const minimist = require('minimist');
var shell = require('shelljs');

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
  while (num >= list[res]) res++;
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

  prettierFile(file);

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

  const mdFile = path.resolve(__dirname, '../README.md');
  fs.writeFileSync(mdFile, newContent, { encoding: 'utf-8' });

  prettierFile(mdFile);

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
    num += ` ${f.name}`;
  });
  content += `git commit -m '${num}'\n`;
  content += `git push`;
  fs.writeFileSync(path.resolve(__dirname, './deploy.sh'), content, { encoding: 'utf-8' });

  Log.SHEnd();
}

function getNPMParams(val, defaults) {
  return val === 'false' ? false : val != null ? val : defaults;
}

function handleNPMParamsArg(argv) {
  if (!argv) return;
  for (let k in argv) {
    argv[k] = getNPMParams(argv[k]);
  }
  return argv;
}

function getNPMBuildParams(key, defaults) {
  try {
    const npm_config_argv = JSON.parse(process.env.npm_config_argv);
    const argv = minimist(npm_config_argv.original);
    return key ? getNPMParams(argv[key], defaults) : handleNPMParamsArg(argv) || defaults;
  } catch (err) {
    console.error('getNPMBuildParams err = ', err);
  }
}

function getExt(filename = '') {
  const li = filename.lastIndexOf('.');
  return li > 0 ? filename.substring(li + 1).toLowerCase() : null;
}

function prettierFile(file) {
  Log.FormatFileStart(file);
  const result = shell.exec(`prettier --write ${file}`, { silent: true });
  Log.FormatFileEnd();
  return result;
}

module.exports = {
  sleep,
  isHttpLink,
  buildTemplate,
  buildFileName,
  writeMD,
  writeCodeFile,
  buildGitSH,
  getNPMBuildParams,
  getExt
};
