const NO_CODE_DIR_MAP = ['.git', 'node_modules', 'img', 'product', 'public', 'src', 'helper'].reduce((pre, cur) => {
  pre[cur] = true;
  return pre;
}, {});

const html_template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>#htmlTitle#</title>
  </head>
  <body>
    <script>
      #htmlContent#
    </script>
  </body>
</html>
`;

const sql_template = `-- #title#\n\n`;

const FILE_TEMPLATE = {
  html: html_template,
  sql: sql_template
};

const WIN_GIT_HEADER = `
echo "如果中文显示乱码"
echo "1. 打开 控制面板—>区域—>管理—>更改系统区域设置"
echo "2. 勾选：使用Unicode UTF-8提供全球语音支持"
echo "3. 重启后即可解决"
`

module.exports = {
  NO_CODE_DIR_MAP,
  FILE_TEMPLATE,
  WIN_GIT_HEADER
};
