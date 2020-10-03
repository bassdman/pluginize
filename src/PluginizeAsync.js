import { DefaultConfig as DefaultPlugin } from './default.config.js';
import { AsyncSeriesHook, AsyncSeriesWaterfallHook } from 'tapable';
import { throwErrorIf, errorMode } from './helpers/throwError.js';

function instance(configInstance = {}) {
    const configsFromInstance = [];
    if (configInstance.apply) {
        let configsAsArray = Array.isArray(configInstance.apply) ? configInstance.apply : [configInstance.apply];
        configsAsArray = configsAsArray.map(entry => { entry.name = entry.name || 'instance(config)'; return entry; })

        configsFromInstance.push(...configsAsArray);
    }

    async function addPluginAsync(conf, ctx) {
        ctx.log('- Add plugin "' + conf.name + '"');

        conf = await ctx.hooks.preInitPlugin.promise(conf, ctx);

        throwErrorIf(!conf.name, `Plugin ${JSON.stringify(conf)} has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.`, 'plugin.noName');
        throwErrorIf(typeof conf === 'function', `Plugin ${conf.name} is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())`, 'plugin.isFunction');
        throwErrorIf(typeof conf !== 'object' || Array.isArray(conf), `Plugin ${conf.name} should be a configuration of type object, but is typeof ${typeof conf}.`, 'plugin.wrongType')

        ctx.plugins.push(conf);

        if (conf.init) {
            throwErrorIf(typeof conf.init !== 'function', `Error in plugin "${conf.name}": config.init must be a function but is a ${typeof conf.init}`, 'config.init.wrongtype')

            ctx.log(`- Execute init() function of plugin ${conf.name}`);
            const globals = await conf.init(conf, ctx);

            if (globals && !globals._context && typeof globals == 'object' && !Array.isArray(globals)) {
                for (let key of Object.keys(globals) || {}) {
                    ctx.log('- add ' + key + ' to global context.');
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
                preInitPlugin: new AsyncSeriesWaterfallHook(['config', 'context']),
                pluginsInitialized: new AsyncSeriesHook(['context']),
                initPlugin: new AsyncSeriesHook(['plugin', 'context']),
            },
            log() {
                if (config.debug)
                    console.log(...arguments);
            }
        };

        if (configInstance.changeConfig)
            config = await configInstance.changeConfig(config, ctx);

        throwErrorIf(config == null, "error in create(config): config.changeConfig returns null but should return an object (the modified config)", "config.changeConfig.returnNull");
        throwErrorIf(Array.isArray(config) || typeof config !== 'object', "error in create(config): config.changeConfig returns a " + typeof config.changeConfig + " but should return an object (the modified config)", "config.changeConfig.wrongType");


        if (config.debug)
            errorMode('development');

        if (!config.name)
            config.name = 'PluginizeAsync';

        ctx.log('Starting Pluginize.')
        await addPluginAsync(DefaultPlugin, ctx);

        for (let pluginToApply of configsFromInstance)
            await addPluginAsync(pluginToApply, ctx);

        await addPluginAsync(config, ctx);


        for (let _plugin of ctx.plugins) {
            throwErrorIf(_plugin == null, "error in Pluginize(config): hook preInitPlugin - a listener returns null but should  return an object (the modified config)", "config.changeConfig.returnNull");
            throwErrorIf(Array.isArray(_plugin) || typeof _plugin !== 'object', "error in Pluginize(config): hook preInitPlugin - a listener should return an object (the modified config) but returns a " + typeof _plugin, "config.changeConfig.wrongType");


            ctx.log('- call hook "initPlugin" of plugin ' + _plugin.name);
            await ctx.hooks.initPlugin.promise(_plugin, ctx);
        }

        ctx.log('- call hook "pluginsInitialized"');
        await ctx.hooks.pluginsInitialized.promise(ctx);

        if (ctx.return) {
            return ctx[ctx.return];
        } else
            return ctx;
    }



    PluginizeAsync._pluginize = 'PluginizeAsync';

    return PluginizeAsync;
}

const PluginizeAsync = instance();
PluginizeAsync.create = instance;

export { PluginizeAsync };