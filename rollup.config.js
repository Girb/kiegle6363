import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: './index.js',
  output: {
    name: 'kiegle6363',
    file: 'bundle.js',
    format: 'umd',
    sourcemap: true,
  },
  watch: {
    include: './**',
    exclude: 'node_modules/**',
    clearScreen: false,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      extensions: ['.js', '.json'],
    }),
  ],
};
