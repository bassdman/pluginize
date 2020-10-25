import cloneDeep from 'lodash.clonedeep';

function ClonePlugin() {
    const cloned = {};
    return {
        _pluginizeInternal: true,
        allowKeys: ['clone'],
        name: 'ClonePlugin',
        onInitPlugin(config, ctx) {
            if (config.clone) {
                let newKey, oldKey;
                for (oldKey of Object.keys(config.clone)) {
                    newKey = config.clone[oldKey];

                    cloned[oldKey] = newKey;
                }
            }
        },
        onReturn(ctx) {
            let newKey, oldKey, value;
            for (oldKey of Object.keys(cloned)) {
                newKey = cloned[oldKey];

                ctx[newKey] = cloneDeep(ctx[oldKey]);
            }
        },
    }
}

export { ClonePlugin }