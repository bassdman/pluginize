const path = require('path');
const webpack = require('webpack');

module.exports = [{
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'pluginize.js',
        library: 'pluginize'
    },
}, {
    entry: './src/index.js',
    mode: 'production',
    //   devtool: 'eval-source-map',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'pluginize.min.js',
        library: 'pluginize',
        libraryTarget: 'amd',
        libraryExport: 'default'
    },
    plugins: [
        new webpack.ProvidePlugin({
            pluginize2: 'pluginize.pluginize',
        })
    ],
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            }
        }, ]
    }
}];