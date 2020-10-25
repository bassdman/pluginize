function ReturnPlugin() {

    return {
        allowKeys: ['return'],
        name: 'ReturnPlugin',
        onInitPlugin(config, ctx) {
            if (config.return) {
                ctx.return = config.return;
            }
        },
    }
}

export { ReturnPlugin }