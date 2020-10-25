function ReturnPlugin() {

    return {
        _pluginizeInternal: true,
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