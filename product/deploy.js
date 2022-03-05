var path = require('path');
var shell = require('shelljs');
const { DEPLOY_FILE_NAME } = require('./config');
const { getPlatform } = require('./util');

function resolve(name) {
  return path.resolve(__dirname, name);
}

function main() {
  shell.echo('--- git script start ---\n');

  const platform = getPlatform();

  switch (platform) {
    case 'win32':
      const wFile = resolve(`.\\${DEPLOY_FILE_NAME.WIN}`);
      shell.exec(`powershell ${wFile}`);
      break;
    default:
      const mFile = resolve(`./${DEPLOY_FILE_NAME.MAC}`);
      shell.exec(`sh ${mFile}`);
      break;
  }

  shell.echo('\n--- git script end ---\n');
}

main();
