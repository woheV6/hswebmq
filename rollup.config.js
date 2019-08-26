import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
export default {
  input: 'index.js',
  output: {
    file: 'lib/bundle.js',
    external: [ 'moment' ], // <-- suppresses the warning
    format: 'es'//iife
  },
  name: 'MyModule_',
  plugins: [
    json(),
    resolve(),
    commonjs()
  ]
};