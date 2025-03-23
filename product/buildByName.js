const { writeMD, buildTemplate, buildFileName, writeCodeFile } = require('./util');

function getSimpleContent(title) {
  return `
 /** 
  * ${title}
  */
 
 // var node = buildLinkNodeByArray(head);
 // var tree = buildTreeByArray([...root]);
 // var { graph: node } = buildUndirectedGraphByArray(adjList);`;
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
