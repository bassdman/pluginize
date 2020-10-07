//import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';


export default [{
    input: 'src/index.js',
    plugins: [nodePolyfills(), commonjs(), resolve()],
    output: [{
        file: 'dist/pluginize.js',
        format: 'iife',
        name: 'pluginize',
    }, {
        file: 'dist/pluginize.min.js',
        format: 'iife',
        name: 'pluginize',
        plugins: [terser()],
    }, {
        file: 'dist/pluginize-esm.js',
        format: 'es',
    }, {
        file: 'dist/pluginize-cjs.js',
        format: 'cjs',
    }],
}];