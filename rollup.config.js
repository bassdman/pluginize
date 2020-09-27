//import resolve from '@rollup/plugin-node-resolve';
//import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [commonjs(), resolve()];

export default [{
    input: ['src/index.js', 'src/helpers/throwError.js'],
    plugins,
    output: [{
        dir: 'spec/generated/',
        format: 'cjs',
    }],
}, {
    input: 'spec/init.spec.js',
    plugins,
    output: [{
        format: 'cjs',
        file: 'spec/generated-spec/init.spec.cjs'
    }],
}];