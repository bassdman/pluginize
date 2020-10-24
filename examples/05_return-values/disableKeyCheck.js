const { pluginize } = require('pluginize');

const customKeyPlugin = {
    return: 'customkey',
    disableKeyCheck: true,
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

/*
    This will throw an error - "custom is not a valid key"
*/
const result = myLibrary.run();
console.log(result)