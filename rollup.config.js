import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';

export default [{
    input: 'src/index.js',
    plugins: [del({ targets: 'dist/*' }), commonjs(), resolve()],
    output: [{
        file: 'dist/pluginize.js',
        format: 'umd',
        name: 'pluginize'
    }, {
        file: 'dist/pluginize.min.js',
        format: 'umd',
        plugins: [terser()],
        name: 'pluginize'
    }, {
        file: 'dist/pluginize-esm.js',
        format: 'es',
        plugins: [terser()],
    }]
}, {
    input: 'src/index.js',
    plugins: [commonjs(), resolve({ browser: true }), ,
        babel({
            babelHelpers: 'runtime',
            presets: ['@babel/preset-env'],
            plugins: [
                "@babel/plugin-transform-runtime",
            ]
        })
    ],
    output: [{
        file: 'dist/pluginize-es5.js',
        format: 'iife',
        name: 'pluginizeWrapper',
        footer: 'var pluginize = pluginizeWrapper.pluginize;',
        sourcemap: true,
        sourcemapExcludeSources: true,
        plugins: [terser()]
    }]

}];