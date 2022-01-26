const NO_CODE_DIR_MAP = ['.git', 'node_modules', 'img', 'product', 'public', 'src'].reduce((pre, cur) => {
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

module.exports = {
  NO_CODE_DIR_MAP,
  FILE_TEMPLATE
};
