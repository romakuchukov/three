import babel from 'rollup-plugin-babel';
import node from 'rollup-plugin-node-resolve';

const src = 'src/';
const dist = 'dist';

const plugins = [node(), babel()];

export default [{
  input: `${src}main.js`,
  output: {
    name: 'Main',
    format: 'iife',
    dir: dist,
    entryFileNames: 'main.min.js'
  },
  plugins
}];
