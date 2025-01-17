import babel from '@rollup/plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json';

const cjs = {
  format: 'cjs',
  exports: 'named',
  sourcemap: true,
};

const esm = {
  format: 'es',
  sourcemap: true,
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const babelConfig = () => ({
  babelrc: true,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
});

const input = './src/index.js';

const getExternal = () => [...Object.keys(pkg.dependencies), /@babel\/runtime/];

const getPlugins = () => [sourceMaps(), localResolve(), babel(babelConfig())];

const config = {
  input,
  output: [
    getESM({ file: 'lib/textkit.es.js' }),
    getCJS({ file: 'lib/textkit.cjs.js' }),
  ],
  external: getExternal(),
  plugins: getPlugins(),
};

export default [config];
