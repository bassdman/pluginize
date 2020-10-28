import { DefaultConfig as DefaultPlugin } from './default.config.js';
import { AsyncHook, AsyncWaterfallHook } from './helpers/hooks.js';
import { throwErrorIf, errorMode } from './helpers/throwError.js';
import { foreachPluginAsync } from './helpers/foreachPlugin.js';

function runPromiseFactory(factoryConfig) {
    async function addPluginAsync(conf, ctx) {

        ctx.log('- Add plugin "' + conf.name + '"');

        conf = await ctx.onPreInitPlugin.promise(conf, ctx) || conf;

        throwErrorIf(conf == null, `Error: Plugin is null`, 'conf.isNull');
        throwErrorIf(!conf.name, `Plugin ${JSON.stringify(conf)} has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.`, 'plugin.noName');
        throwErrorIf(typeof conf === 'function', `Plugin ${conf.name} is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())`, 'plugin.isFunction');
        throwErrorIf(typeof conf !== 'object' || Array.isArray(conf), `Plugin ${conf.name} should be a configuration of type object, but is typeof ${typeof conf}.`, 'plugin.wrongType');

        ctx.plugins.push(conf);

        if (conf.onInit) {
            throwErrorIf(typeof conf.onInit !== 'function', `Error in plugin "${conf.name}": config.onInit must be a function but is a ${typeof conf.onInit}`, 'config.onInit.wrongtype');
            ctx.log(`- Execute onInit() function of plugin ${conf.name}`);
            const globals = await conf.onInit(ctx.config, conf, ctx);
            if (globals && !globals._context && typeof globals == 'object' && !Array.isArray(globals)) {
                for (let key of Object.keys(globals) || {}) {
                    ctx.log('- add ' + key + ' to global context.');
                    ctx[key] = globals[key];
                }
            }
        }

        if (conf.onInitPlugin) {
            await ctx.onInitPlugin.tap(conf.name, conf.onInitPlugin);
        }

        throwErrorIf(conf.plugins && !Array.isArray(conf.plugins), `Error in plugin "${conf.name}": config.plugin must be an array but is an ${typeof conf.plugins}`, 'config.plugin.wrongtype');

        for (let _plugin of conf.plugins || []) {
            await addPluginAsync(_plugin, ctx);
        }
        return ctx;
    }

    return async function runPromise(config = {}) {
        config = Object.assign(config, factoryConfig.configs[factoryConfig.configs.length - 1] || {});
        if (factoryConfig.configs.length > 1)
            factoryConfig.configs.pop();

        let ctx = {
            plugins: [],
            _context: true,
            addPlugin: addPluginAsync,
            onInitPlugin: new AsyncHook(['plugin', 'context']),
            onPreInitPlugin: new AsyncWaterfallHook(['config', 'context']),
            onPreInit: new AsyncWaterfallHook(['config', 'context']),
            onReturn: new AsyncHook(['context']),
            onPluginsInitialized: new AsyncHook(['context']),
            log() {
                if (config.debug)
                    console.log(...arguments);
            }
        };

        for (let parentConfig of factoryConfig.configs) {
            await foreachPluginAsync(parentConfig, async _plugin => {
                if (_plugin.onPreInit)
                    ctx.onPreInit.tap(_plugin.name, _plugin.onPreInit);
            })
        }

        config = await ctx.onPreInit.promise(config, ctx);

        ctx.config = config;

        throwErrorIf(config == null, 'pluginize(config,factoryConfig): factoryConfig.onPreInit returns null but should return the modified config.', 'factoryConfig.preInit.isNull')
        throwErrorIf(typeof config !== 'object', 'pluginize(config,factoryConfig): factoryConfig.onPreInit returns a ' + typeof entry + 'but should return an object.', 'factoryConfig.preInit.wrongType')
        throwErrorIf(Array.isArray(config), 'pluginize(config,factoryConfig): factoryConfig.onPreInit returns an Array but should return an object.', 'factoryConfig.preInit.wrongTypeArray')


        if (config.debug)
            errorMode('development');

        if (!config.name)
            config.name = 'PluginizeAsync';

        ctx.log('Starting Pluginize.')
        await addPluginAsync(DefaultPlugin, ctx);

        for (let pluginTorunPromise of factoryConfig.configs)
            await addPluginAsync(pluginTorunPromise, ctx);

        await addPluginAsync(config, ctx);


        for (let _plugin of ctx.plugins) {
            throwErrorIf(_plugin == null, "error in Pluginize(config): hook onPreInitPlugin - a listener returns null but should  return an object (the modified config)", "config.preInit.returnNull");
            throwErrorIf(Array.isArray(_plugin) || typeof _plugin !== 'object', "error in Pluginize(config): hook onPreInitPlugin - a listener should return an object (the modified config) but returns a " + typeof _plugin, "config.preInit.wrongType");


            ctx.log('- call hook "onInitPlugin" of plugin ' + _plugin.name);
            await ctx.onInitPlugin.promise(_plugin, ctx);
        }

        ctx.log('- call hook "onPluginsInitialized"');
        await ctx.onPluginsInitialized.promise(ctx);

        await ctx.onReturn.promise(ctx);

        if (ctx.return) {
            return ctx[ctx.return];
        } else
            return ctx;
    }
}

export { runPromiseFactory }