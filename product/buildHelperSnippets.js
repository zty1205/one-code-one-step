// html内没找到可以使用typescript智能提示的方法，所以使用vs的用户代码片段替代

const fs = require('fs');
const path = require('path');
const log = require('./log');
const { prettierFile } = require('./util');

const FILTER = new Set(['common.js']);
const DIR = path.resolve(__dirname, '../helper');
const outputFile = path.join(__dirname, '../.vscode/helper.code-snippets');

class Handler {
  keyword = '';
  constructor(keyword = '') {
    this.keyword = keyword;
  }

  is(string = '') {
    return string.indexOf(this.keyword) > -1;
  }
}

class FunctionHandler extends Handler {
  constructor() {
    super('function');
  }
  getTemplate(str = '') {
    if (!this.is(str)) return '';
    const fname = str.match(/function\s(.+)\(/)[1].trim();
    if (fname[0] === '_') return '';
    return `
  "${fname}": {
    "scope": "javascript,html",
    "prefix": "help:${fname}",
    "body": "${str.replace('function', '').trim()}",
  },
  `;
  }
}

class ClassHandler extends Handler {
  constructor() {
    super('class');
  }
  getTemplate(str = '') {
    if (!this.is(str)) return '';
    const cName = str.match(/class\s(.+)/)[1].trim();
    return `
 "${cName}": {
   "scope": "javascript,html",
   "prefix":  "help:${cName}",
   "body": "new ${cName}()",
 },
 `;
  }
}

class Solver {
  constructor(handers = []) {
    this.handers = handers;
  }

  getKeyWorksReg() {
    return new RegExp(`(${this.handers.map((x) => x.keyword).join('|')}) (.+) `, 'g');
  }

  onlyRunner(cmd = '', args = []) {
    for (let hd of this.handers) {
      const fn = hd[cmd];
      if (typeof fn === 'function') {
        let res = fn.apply(hd, args);
        if (res) {
          return res;
        }
      }
    }
    return;
  }

  buildContent() {
    log.BuildHelperStart(DIR);

    let codeSnippets = '';

    fs.readdirSync(DIR)
      .filter((name) => !FILTER.has(name))
      .forEach((name) => {
        const content = fs.readFileSync(path.join(DIR, name), { encoding: 'utf-8' });
        const match = content.match(this.getKeyWorksReg());
        if (match) {
          match.forEach((str) => {
            codeSnippets += this.onlyRunner('getTemplate', [str.trim()]) || '';
          });
        }
      });

    log.BuildHelperEnd();

    return codeSnippets;
  }
  run() {
    const content = this.buildContent();
    fs.writeFileSync(outputFile, `{${content}}`, { encoding: 'utf-8' });
    prettierFile(outputFile);
  }
}

const solver = new Solver([new FunctionHandler(), new ClassHandler()]);
solver.run();
