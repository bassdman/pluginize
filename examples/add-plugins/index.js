const sayHelloPlugin = require('./sayhello.plugin');
const { pluginize } = require('pluginize');

const myLibrary = pluginize({
    plugins: [sayHelloPlugin]
});

const result = myLibrary.applySync();

console.log(result);