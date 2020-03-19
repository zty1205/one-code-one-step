const {
  addWebpackAlias,
  override,
  fixBabelImports
} = require('customize-cra')

const path = require('path')

function pathResolve(pathUrl) {
  return path.join(__dirname, pathUrl)
}

module.exports = override(
  addWebpackAlias({
    '@': pathResolve('./src'),
    'assets': pathResolve('./src/assets'),
    'components': pathResolve('./src/components'),
    'utils': pathResolve('./src/utils')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  })
);