function DeletePlugin() {
    const toDelete = [];
    return {
        allowKeys: ['delete'],
        name: 'DeletePlugin',
        hooks: {

            onReturn(ctx) {
                for (let key of toDelete) {

                    delete ctx[key];
                }
            },
        },
        onInitPlugin(config, ctx) {
            if (config.delete) {
                toDelete.push(...config.delete);
            }
        },
    }
}

export { DeletePlugin }