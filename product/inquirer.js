const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { NO_CODE_DIR_MAP } = require('./config');
const { isHttpLink } = require('./util');

async function inquiry(argv = {}) {
  return new Promise((resolve) => {
    const files = fs.readdirSync(path.resolve(__dirname, '../'));

    const codeDir = files
      .filter((file) => {
        const stat = fs.statSync(file);
        return stat.isDirectory();
      })
      .filter((file) => !NO_CODE_DIR_MAP[file]);

    const { name: argvName, ext: argvExt, dir: argvDir } = argv;

    const inquirerName = argvName
      ? null
      : {
          type: 'input',
          message: '文件名，多个文件名使用","分格; 或输入LeetCode网页地址',
          name: 'name',
          validate: function (val) {
            const done = this.async();
            if (!val) {
              done('请输入文件名');
              return;
            }
            done(null, true);
          }
        };

    const inquirerExt = argvExt
      ? null
      : {
          type: 'input',
          message: '文件后缀，默认html: ',
          name: 'ext',
          default: 'html',
          when: function (answer) {
            return argvName || answer.name;
          }
        };

    const inquirerDir = argvDir
      ? null
      : {
          type: 'list',
          message: '文件夹，默认leetCode：',
          name: 'dist',
          default: 'leetCode',
          choices: codeDir,
          when: function (answer) {
            return argvName || answer.name;
          }
        };
    const promptList = [inquirerName, inquirerExt, inquirerDir].filter(Boolean);

    inquirer.prompt(promptList).then((answer) => {
      const { name = argvName, ext = argvExt, dist = argvDir } = answer;
      const isLink = isHttpLink(name);
      resolve({
        name: isLink ? name : name.split(','),
        isLink,
        ext,
        dist
      });
    });
  });
}

module.exports = inquiry;
