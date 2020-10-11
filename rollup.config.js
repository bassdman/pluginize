//import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import del from 'rollup-plugin-delete';


export default [{
    input: 'src/index.js',
    plugins: [del({ targets: 'dist/*' }), nodePolyfills(), commonjs(), resolve()],
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
    plugins: [nodePolyfills(), commonjs(), resolve(), babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] })],
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