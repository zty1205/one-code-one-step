const FgBlack = '\x1b[30m';
const FgRed = '\x1b[31m';
const FgGreen = '\x1b[32m';
const FgYellow = '\x1b[33m';
const FgBlue = '\x1b[34m';
const FgMagenta = '\x1b[35m';
const FgCyan = '\x1b[36m';
const FgWhite = '\x1b[37m';

module.exports = {
  ProgramStart() {
    console.log(FgGreen, '****** 程序启动 ******');
  },
  ProgramEnd() {
    console.log(FgGreen, '****** 程序结束 ******');
  },
  URLPageStart(url) {
    console.log(FgMagenta, `--- 开始获取浏览器数据 ${url} ---`);
  },
  URLPageEnd() {
    console.log(FgMagenta, `--- 浏览器数据获取完毕 ---`);
  },
  BuildFileStart(file) {
    console.log(FgYellow, `--- 开始生成文件 ${file} ---`);
  },
  BuildFileEnd() {
    console.log(FgYellow, `--- 文件生成完毕 ---`);
  },
  MDStart() {
    console.log(FgYellow, '--- 开始生成MD链接 ---');
  },
  MDEnd() {
    console.log(FgYellow, '--- MD链接生成完毕 ---');
  },
  SHStart() {
    console.log(FgBlue, '--- 开始生成sh文件 ---');
  },
  SHEnd() {
    console.log(FgBlue, '--- sh文件生成完毕 ---');
  },
  FormatFileStart(file) {
    console.log(FgWhite, `--- 开始格式化文件 ${file} ---`);
  },
  FormatFileEnd() {
    console.log(FgWhite, `--- 文件格式化完毕 ---`);
  },
  BuildHelperStart(file) {
    console.log(FgYellow, `--- 开始构建helper-snippets ${file} ---`);
  },
  BuildHelperEnd() {
    console.log(FgYellow, `--- snippets构建完毕 ---`);
  }
};
