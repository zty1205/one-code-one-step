const fs = require('fs');
const path = require('path');
const { DM_FITTER_DIR_MAP } = require('./config');

const files = fs.readdirSync(path.resolve(__dirname, '../designMode')) || [];
const modes = files
  .filter((m) => !DM_FITTER_DIR_MAP[m])
  .map((path) => {
    const [name, ext] = path.split('.');
    return {
      path,
      name,
      ext
    };
  });

const header = modes.map((mode) => `import * as ${mode.name} from './${mode.name}';\n`).join('');
const run = modes.map((mode) => `${mode.name}.run();\n`).join('');

fs.writeFileSync(path.resolve(__dirname, '../designMode/index.ts'), `${header}\n${run}`, { encoding: 'utf-8' });
