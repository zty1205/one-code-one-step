import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'designMode/index.ts',
  output: {
    file: 'designMode/dist/bundle.js'
  },
  watch: {
    include: 'designMode/**'
  },
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
    serve({
      open: true, // 是否打开浏览器
      contentBase: './designMode/dist', // 入口html的文件位置 会自动查找HTML文件
      historyApiFallback: true, // Set to true to return index.html instead of 404
      host: 'localhost',
      port: 10001
    }),
    livereload({
      watch: 'designMode/dist/' //监听文件夹;
    })
  ]
};

