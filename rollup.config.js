//import resolve from '@rollup/plugin-node-resolve';
//import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [commonjs(), resolve()];

export default [{
    input: ['src/index.js', 'src/helpers/throwError.js', 'src/helpers/hooks.js'],
    plugins,
    output: [{
        dir: 'spec/generated/',
        format: 'cjs',
    }],
}, {
    input: 'spec/pluginize.spec.js',
    plugins,
    output: [{
        format: 'cjs',
        file: 'spec/generated-spec/pluginize.spec.cjs'
    }],
}, {
    input: 'spec/pluginizeAsync.spec.js',
    plugins,
    output: [{
        format: 'cjs',
        file: 'spec/generated-spec/pluginizeAsync.spec.cjs'
    }],
}];