import { DefaultConfig as DefaultPlugin } from './default.config.js';
import { SyncHook, SyncWaterfallHook } from './helpers/hooks.js';
import { throwErrorIf, errorMode } from './helpers/throwError.js';

function runFactory(factoryConfig) {
    function addPluginSync(conf, ctx) {

        ctx.log('- Add plugin "' + conf.name + '"');

        conf = ctx.onPreInitPlugin.call(conf, ctx) || conf;

        throwErrorIf(conf == null, `Error: Plugin is null`, 'conf.isNull');
        throwErrorIf(!conf.name, `Plugin ${JSON.stringify(conf)} has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.`, 'plugin.noName');
        throwErrorIf(typeof conf === 'function', `Plugin ${conf.name} is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())`, 'plugin.isFunction');
        throwErrorIf(typeof conf !== 'object' || Array.isArray(conf), `Plugin ${conf.name} should be a configuration of type object, but is typeof ${typeof conf}.`, 'plugin.wrongType')

        ctx.plugins.push(conf);

        if (conf.onInit) {
            throwErrorIf(typeof conf.onInit !== 'function', `Error in plugin "${conf.name}": config.onInit must be a function but is a ${typeof conf.onInit}`, 'config.onInit.wrongtype')

            ctx.log(`- Execute onInit() function of plugin ${conf.name}`);
            const globals = conf.onInit(ctx.config, conf, ctx);

            if (globals && !globals._context && typeof globals == 'object' && !Array.isArray(globals)) {
                for (let key of Object.keys(globals) || {}) {
                    ctx.log('- add ' + key + ' to global context.');
                    ctx[key] = globals[key];
                }
            }

        }

        if (conf.onInitPlugin) {
            ctx.onInitPlugin.tap(conf.name, conf.onInitPlugin);
        }

        throwErrorIf(conf.plugins && !Array.isArray(conf.plugins), `Error in plugin "${conf.name}": config.plugin must be an array but is an ${typeof conf.plugins}`, 'config.plugin.wrongtype')

        for (let _plugin of conf.plugins || []) {
            addPluginSync(_plugin, ctx);
        }

        return ctx;
    }

    return function run(config = {}) {
        config = Object.assign(config, factoryConfig.configs[factoryConfig.configs.length - 1] || {});

        let ctx = {
            plugins: [],
            config,
            _context: true,
            addPlugin: addPluginSync,
            onInitPlugin: new SyncHook(['plugin', 'context']),
            onPreInitPlugin: new SyncWaterfallHook(['config', 'context']),
            onReturn: new SyncHook(['context']),
            onPluginsInitialized: new SyncHook(['context']),
            log() {
                if (config.debug)
                    console.log(...arguments);
            }
        };

        for (let parentConfig of factoryConfig.configs) {
            if (parentConfig.onPreInit)
                parentConfig.onPreInit(config, ctx);
        }


        throwErrorIf(config == null, 'pluginize(config,factoryConfig): factoryConfig.onPreInit returns null but should return the modified config.', 'factoryConfig.preInit.isNull')
        throwErrorIf(typeof config !== 'object', 'pluginize(config,factoryConfig): factoryConfig.onPreInit returns a ' + typeof entry + 'but should return an object.', 'factoryConfig.preInit.wrongType')
        throwErrorIf(Array.isArray(config), 'pluginize(config,factoryConfig): factoryConfig.onPreInit returns an Array but should return an object.', 'factoryConfig.preInit.wrongTypeArray')


        if (config.debug)
            errorMode('development');

        if (!config.name)
            config.name = 'Pluginize';

        ctx.log('Starting Pluginize.')
        addPluginSync(DefaultPlugin, ctx);

        for (let pluginTorunPromise of factoryConfig.configs)
            addPluginSync(pluginTorunPromise, ctx);

        addPluginSync(config, ctx);


        for (let _plugin of ctx.plugins) {
            throwErrorIf(_plugin == null, "error in Pluginize(config): hook onPreInitPlugin - a listener returns null but should  return an object (the modified config)", "config.preInit.returnNull");
            throwErrorIf(Array.isArray(_plugin) || typeof _plugin !== 'object', "error in Pluginize(config): hook onPreInitPlugin - a listener should return an object (the modified config) but returns a " + typeof _plugin, "config.preInit.wrongType");

            ctx.log('- call hook "onInitPlugin" of plugin ' + _plugin.name);
            ctx.onInitPlugin.call(_plugin, ctx);
        }

        ctx.log('- call hook "onPluginsInitialized"');
        ctx.onPluginsInitialized.call(ctx);

        ctx.onReturn.call(ctx);

        if (ctx.return) {
            return ctx[ctx.return];
        } else
            return ctx;
    }
}

export { runFactory }