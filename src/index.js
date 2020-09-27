import { DefaultConfig as DefaultPlugin } from './default.config.js';
import { AsyncHook, SyncHook } from './helpers/hooks.js';
import { throwError, throwErrorIf, errorMode } from './helpers/throwError.js';

/*
    Sync
*/
function addPluginSync(conf, ctx) {
    throwErrorIf(!conf.name, `Plugin ${JSON.stringify(conf)} has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.`, 'plugin.noName');
    throwErrorIf(typeof conf === 'function', `Plugin ${conf.name} is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())`, 'plugin.isFunction');
    throwErrorIf(typeof conf !== 'object' || Array.isArray(conf), `Plugin ${conf.name} should be a configuration of type object, but is typeof ${typeof conf}.`, 'plugin.wrongType')

    ctx.plugins.push(conf);

    if (conf.init) {
        throwErrorIf(typeof conf.init !== 'function', `Error in plugin "${conf.name}": config.init must be a function but is a ${typeof conf.init}`, 'config.init.wrongtype')

        const globals = conf.init(conf, ctx);

        if (globals && !globals._context && typeof globals == 'object' && !Array.isArray(globals)) {
            for (let key of Object.keys(globals) || {}) {
                ctx[key] = globals[key];
            }
        }

    }

    if (conf.hooks && conf.hooks.initPlugin) {
        ctx.hooks.initPlugin.tap(conf.name, conf.hooks.initPlugin);
    }

    throwErrorIf(conf.plugins && !Array.isArray(conf.plugins), `Error in plugin "${conf.name}": config.plugin must be an array but is an ${typeof conf.plugins}`, 'config.plugin.wrongtype')

    for (let _plugin of conf.plugins || []) {
        addPluginSync(_plugin, ctx);
    }

    return ctx;
}

function Pluginize(config = {}) {
    let ctx = {
        plugins: [],
        config,
        _context: true,
        addPlugin: addPluginSync,
        hooks: {
            pluginsInitialized: new SyncHook(),
            initPlugin: new SyncHook(),
        }
    };

    if (!config.name)
        config.name = 'Pluginize';

    addPluginSync(DefaultPlugin, ctx);
    addPluginSync(config, ctx);


    for (let _plugin of ctx.plugins) {
        ctx.hooks.initPlugin.call(_plugin, ctx);
    }

    ctx.hooks.pluginsInitialized.call(ctx);
    return ctx;
}

/*
 *  End Sync 
 */

/*
    Async
*/
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
            pluginsInitialized: new AsyncHook(),
            initPlugin: new AsyncHook(),
        }
    };

    if (config.debug)
        errorMode('development');

    if (!config.name)
        config.name = 'PluginizeAsync';

    await addPluginAsync(DefaultPlugin, ctx);
    await addPluginAsync(config, ctx);

    for (let _plugin of ctx.plugins) {
        await ctx.hooks.initPlugin.call(_plugin, ctx);
    }

    await ctx.hooks.pluginsInitialized.call(ctx);
    return ctx;
}

/*
 *  End Aysnc 
 */

export { Pluginize, PluginizeAsync }