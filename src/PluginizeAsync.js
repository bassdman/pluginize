import { DefaultConfig as DefaultPlugin } from './default.config.js';
import { AsyncSeriesHook } from 'tapable';
import { throwErrorIf, errorMode } from './helpers/throwError.js';

async function addPluginAsync(conf, ctx) {

    throwErrorIf(!conf.name, `Plugin ${JSON.stringify(conf)} has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.`, 'plugin.noName');
    throwErrorIf(typeof conf === 'function', `Plugin ${conf.name} is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())`, 'plugin.isFunction');
    throwErrorIf(typeof conf !== 'object' || Array.isArray(conf), `Plugin ${conf.name} should be a configuration of type object, but is typeof ${typeof conf}.`, 'plugin.wrongType')

    ctx.plugins.push(conf);

    if (conf.init) {
        throwErrorIf(typeof conf.init !== 'function', `Error in plugin "${conf.name}": config.init must be a function but is a ${typeof conf.init}`, 'config.init.wrongtype')

        const globals = await conf.init(conf, ctx);

        if (globals && !globals._context && typeof globals == 'object') {
            for (let key of Object.keys(globals) || {}) {
                ctx[key] = globals[key];
            }
        }

    }

    if (conf.hooks && conf.hooks.initPlugin) {
        await ctx.hooks.initPlugin.tap(conf.name, conf.hooks.initPlugin);
    }

    throwErrorIf(conf.plugins && !Array.isArray(conf.plugins), `Error in plugin "${conf.name}": config.plugin must be an array but is an ${typeof conf.plugins}`, 'config.plugin.wrongtype')

    for (let _plugin of conf.plugins || []) {
        await addPluginAsync(_plugin, ctx);
    }

    return ctx;
}

async function PluginizeAsync(config = {}) {
    let ctx = {
        plugins: [],
        config,
        _context: true,
        addPlugin: addPluginAsync,
        hooks: {
            pluginsInitialized: new AsyncSeriesHook(['context']),
            initPlugin: new AsyncSeriesHook(['plugin', 'context']),
        }
    };

    if (config.debug)
        errorMode('development');

    if (!config.name)
        config.name = 'PluginizeAsync';

    await addPluginAsync(DefaultPlugin, ctx);
    await addPluginAsync(config, ctx);

    for (let _plugin of ctx.plugins) {
        await ctx.hooks.initPlugin.promise(_plugin, ctx);
    }

    await ctx.hooks.pluginsInitialized.promise(ctx);

    if (config.return)
        return ctx[config.return];
    else
        return ctx;
}

PluginizeAsync._pluginize = 'PluginizeAsync';

export { PluginizeAsync };