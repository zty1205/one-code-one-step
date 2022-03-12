const { writeMD, buildTemplate, buildFileName, writeCodeFile } = require('./util');

function getSimpleContent(title) {
  return `
 /** 
  * ${title}
  */

 // --- example-1 ---
 
 // --- example-1 ---
 
 // --- example-2 ---
 
 // --- example-2 ---`;
}

function buildByName(str, dist, ext) {
  let name = str.replace(/\s/g, '');

  const template = buildTemplate(ext, { htmlTitle: name, htmlContent: getSimpleContent(name) });
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
