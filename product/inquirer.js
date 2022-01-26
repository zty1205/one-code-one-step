const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { NO_CODE_DIR_MAP } = require('./config');
const { isHttpLink } = require('./util');

async function inquiry() {
  return new Promise((resolve) => {
    const files = fs.readdirSync(path.resolve(__dirname, '../'));

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
      .then((answer) => {
        const { name, ext, dist } = answer;
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
