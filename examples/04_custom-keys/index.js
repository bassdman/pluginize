const { pluginize } = require('pluginize');

const customKeyPlugin = {
    return: 'customkey',
    allowKeys: ['custom'],
    init(config) {
        return {
            customkey: config.custom
        }
    },
};

const myLibrary = pluginize({
    custom: 'heinrich',
    plugins: [customKeyPlugin]
})

const result = myLibrary.run();
console.log(result)