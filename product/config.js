const NO_CODE_DIR_MAP = ['.vscode', '.git', 'node_modules', 'img', 'product', 'public', 'src', 'helper'].reduce(
  (pre, cur) => {
    pre[cur] = true;
    return pre;
  },
  {}
);

const html_template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>#htmlTitle#</title>
  </head>
  <body>
    <script src="../helper/common.js"></script>
    <script src="../helper/node.js"></script>
    <script src="../helper/tree.js"></script>
    <script src="../helper/graph.js"></script>
    <script>
      #htmlContent#
    </script>
  </body>
</html>
`;

const sql_template = `-- #htmlTitle#\n\n`;

const sh_template = `# #htmlTitle#\n\n`;

const js_template = `
/** 
 * #htmlTitle#
*/
`;

const ts_template = `
/** 
 * #htmlTitle#
*/

export function run() {
  console.log('--- ---')



  console.log('--- ---')
  console.log('')
}
`;

const FILE_TEMPLATE = {
  html: html_template,
  sql: sql_template,
  sh: sh_template,
  js: js_template,
  ts: ts_template
};

const WIN_GIT_HEADER = `
echo "如果中文显示乱码"
echo "1. 打开 控制面板—>区域—>管理—>更改系统区域设置"
echo "2. 勾选：使用Unicode UTF-8提供全球语音支持"
echo "3. 重启后即可解决"
`;

const DEPLOY_FILE_NAME = {
  WIN: 'deploy.ps1',
  MAC: 'deploy.sh'
};

const DM_FITTER_DIR_MAP = ['dist', 'index.ts'].reduce((pre, cur) => {
  pre[cur] = true;
  return pre;
}, {});

module.exports = {
  NO_CODE_DIR_MAP,
  FILE_TEMPLATE,
  WIN_GIT_HEADER,
  DEPLOY_FILE_NAME,
  DM_FITTER_DIR_MAP
};
