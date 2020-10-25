function InitHooksPlugin(ctx) {
    return {
        _pluginizeInternal: true,
        name: 'InitHooksPlugin',
        allowKeys: ['onReturn', 'onPreInitPlugin', 'onPluginsInitialized'],

        onInit: function(config, pluginConfig, ctx) {
            if (config.onPreInitPlugin)
                ctx.onPreInitPlugin.tap('onPreInitPlugin', config.onPreInitPlugin);


        },
        onInitPlugin(config, ctx) {
            if (config.onReturn) {
                ctx.onReturn.tap(config.name, config.onReturn);
            }

            if (config.onPluginsInitialized) {
                ctx.onPluginsInitialized.tap(config.name, config.onPluginsInitialized);
            }
        }
    }
}

export { InitHooksPlugin }