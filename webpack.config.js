const path = require('path');

module.exports = [{
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'pluginize.js',
        library: 'Pluginize'
    },
}, {
    entry: './src/index.js',
    mode: 'production',
    devtool: 'eval-source-map',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'pluginize.min.js',
        library: 'Pluginize',
    },
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
        }]
    }
}];