function RenamePlugin() {
    const renamed = {};
    return {
        allowKeys: ['rename'],
        name: 'RenamePlugin',
        hooks: {
            initPlugin(config, ctx) {
                if (config.rename) {
                    let newKey, oldKey;
                    for (oldKey of Object.keys(config.rename)) {
                        newKey = config.rename[oldKey];

                        renamed[oldKey] = newKey;
                    }
                }
            },
            return (ctx) {
                let newKey, oldKey, value;
                for (oldKey of Object.keys(renamed)) {
                    newKey = renamed[oldKey];

                    ctx[newKey] = ctx[oldKey];
                    delete ctx[oldKey];
                }
            },
        },
    }
}

export { RenamePlugin }