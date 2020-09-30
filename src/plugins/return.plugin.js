function ReturnPlugin() {

    return {
        allowKeys: ['return'],
        name: 'ReturnPlugin',
        hooks: {
            initPlugin(config, ctx) {
                if (config.return) {
                    ctx.return = config.return;
                }
            },
        },
    }
}

export { ReturnPlugin }