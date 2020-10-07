import { DefaultConfig as DefaultPlugin } from './default.config.js';
import { SyncHook, SyncWaterfallHook } from './helpers/hooks.js';
import { throwErrorIf, errorMode } from './helpers/throwError.js';

function applySyncFactory(configsFromInstance, configInstance) {
    function addPluginSync(conf, ctx) {

        ctx.log('- Add plugin "' + conf.name + '"');

        conf = ctx.hooks.preInitPlugin.call(conf, ctx) || conf;

        throwErrorIf(conf == null, `Error: Plugin is null`, 'conf.isNull');
        throwErrorIf(!conf.name, `Plugin ${JSON.stringify(conf)} has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.`, 'plugin.noName');
        throwErrorIf(typeof conf === 'function', `Plugin ${conf.name} is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())`, 'plugin.isFunction');
        throwErrorIf(typeof conf !== 'object' || Array.isArray(conf), `Plugin ${conf.name} should be a configuration of type object, but is typeof ${typeof conf}.`, 'plugin.wrongType')

        ctx.plugins.push(conf);

        if (conf.init) {
            throwErrorIf(typeof conf.init !== 'function', `Error in plugin "${conf.name}": config.init must be a function but is a ${typeof conf.init}`, 'config.init.wrongtype')

            ctx.log(`- Execute init() function of plugin ${conf.name}`);
            const globals = conf.init(conf, ctx);

            if (globals && !globals._context && typeof globals == 'object' && !Array.isArray(globals)) {
                for (let key of Object.keys(globals) || {}) {
                    ctx.log('- add ' + key + ' to global context.');
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

    return function applySync(config = {}) {
        console.log('start applysync')
        let ctx = {
            plugins: [],
            config,
            _context: true,
            addPlugin: addPluginSync,
            hooks: {
                preInitPlugin: new SyncWaterfallHook(['config', 'context']),
                pluginsInitialized: new SyncHook(['context']),
                initPlugin: new SyncHook(['plugin', 'context']),
            },
            log() {
                if (config.debug)
                    console.log(...arguments);
            }
        };

        if (configInstance.changeConfig)
            config = configInstance.changeConfig(config, ctx);
        throwErrorIf(config == null, "error in pluginize(config): config.changeConfig returns null but should return an object (the modified config)", "config.changeConfig.returnNull");
        throwErrorIf(Array.isArray(config) || typeof config !== 'object', "error in pluginize(config): config.changeConfig returns a " + typeof config.changeConfig + " but should return an object (the modified config)", "config.changeConfig.wrongType");


        if (config.debug)
            errorMode('development');

        if (!config.name)
            config.name = 'Pluginize';

        ctx.log('Starting Pluginize.')
        addPluginSync(DefaultPlugin, ctx);

        console.log('dahin bin ich da1', config)

        for (let pluginToApply of configsFromInstance)
            addPluginSync(pluginToApply, ctx);

        console.log('dahin bin ich da2', config)

        addPluginSync(config, ctx);


        for (let _plugin of ctx.plugins) {
            throwErrorIf(_plugin == null, "error in Pluginize(config): hook preInitPlugin - a listener returns null but should  return an object (the modified config)", "config.changeConfig.returnNull");
            throwErrorIf(Array.isArray(_plugin) || typeof _plugin !== 'object', "error in Pluginize(config): hook preInitPlugin - a listener should return an object (the modified config) but returns a " + typeof _plugin, "config.changeConfig.wrongType");


            ctx.log('- call hook "initPlugin" of plugin ' + _plugin.name);
            ctx.hooks.initPlugin.call(_plugin, ctx);
        }

        ctx.log('- call hook "pluginsInitialized"');
        ctx.hooks.pluginsInitialized.call(ctx);

        if (ctx.return) {
            return ctx[ctx.return];
        } else
            return ctx;
    }
}

export { applySyncFactory }