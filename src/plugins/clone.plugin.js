import cloneDeep from 'lodash.clonedeep';

function ClonePlugin() {
    const cloned = {};
    return {
        allowKeys: ['clone'],
        name: 'ClonePlugin',
        hooks: {
            initPlugin(config, ctx) {
                if (config.clone) {
                    let newKey, oldKey;
                    for (oldKey of Object.keys(config.clone)) {
                        newKey = config.clone[oldKey];

                        cloned[oldKey] = newKey;
                    }
                }
            },
            return (ctx) {
                let newKey, oldKey, value;
                for (oldKey of Object.keys(cloned)) {
                    newKey = cloned[oldKey];

                    ctx[newKey] = cloneDeep(ctx[oldKey]);
                }
            },
        },
    }
}

export { ClonePlugin }