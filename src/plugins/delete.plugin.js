function DeletePlugin() {
    const toDelete = [];
    return {
        allowKeys: ['delete'],
        name: 'DeletePlugin',
        hooks: {
            initPlugin(config, ctx) {
                if (config.delete) {
                    toDelete.push(...config.delete);
                }
            },
            onReturn(ctx) {
                for (let key of toDelete) {

                    delete ctx[key];
                }
            },
        },
    }
}

export { DeletePlugin }