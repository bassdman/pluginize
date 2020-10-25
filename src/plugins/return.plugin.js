function ReturnPlugin() {

    return {
        allowKeys: ['return', 'onReturn'],
        name: 'ReturnPlugin',
        onInitPlugin(config, ctx) {
            if (config.return) {
                ctx.return = config.return;
            }

            if (config.onReturn) {
                ctx.onReturn.tap(config.name, config.onReturn);
            }
        },
    }
}

export { ReturnPlugin }