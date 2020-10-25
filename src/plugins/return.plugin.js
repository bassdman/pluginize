function ReturnPlugin() {

    return {
        allowKeys: ['return'],
        name: 'ReturnPlugin',
        hooks: {
            onInitPlugin(config, ctx) {
                if (config.return) {
                    ctx.return = config.return;
                }
            },
        },
    }
}

export { ReturnPlugin }