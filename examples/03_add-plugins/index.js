const sayHelloPlugin = require('./sayhello.plugin');
const sayHelloPluginCustomizable = require('./sayhello-customizable.plugin');

const { pluginize } = require('pluginize');

const myLibrary = pluginize({
    plugins: [sayHelloPlugin, sayHelloPluginCustomizable({ really: 'yes' })]
});

const result = myLibrary.run();

console.log(result);