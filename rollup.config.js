import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy-assets';
import node from 'rollup-plugin-node-resolve';

const src = 'src/';
const dist = 'dist';

export default [{
  input: `${src}main.js`,
  output: {
    name: 'Main',
    format: 'iife',
    dir: dist,
    entryFileNames: 'main.min.js'
  },
  plugins: [
    node(),
    babel(),
    copy({
      assets: ['models/json/suzanne_buffergeometry.json']
    })
  ]
}];
