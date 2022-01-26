const { writeMD, buildTemplate, buildFileName, writeCodeFile } = require('./util');

function buildByName(str, dist, ext) {
  let name = str.replace(/\s/g, '');

  const template = buildTemplate(ext, { htmlTitle: name, htmlContent: '' });
  const file = buildFileName(name, dist, ext);

  writeCodeFile(file, template);

  const { link, curNum } = writeMD(name, dist, ext);

  return {
    name,

    file,
    link,
    curNum
  };
}

module.exports = buildByName;
