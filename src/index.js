import { runPromiseFactory } from './runPromise';
import { runFactory } from './run';
import { throwErrorIf, errorMode } from './helpers/throwError.js';
import { SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook, SyncBreakableHook, AsyncBreakableHook } from './helpers/hooks.js';

const validPluginAttributes = ['resolve', 'init'];

function pluginize(configInstance = {}, _factoryConfig = {}) {
    const factoryConfig = Object.assign({
        configs: [],
        plugins: []
    }, _factoryConfig);

    throwErrorIf(!Array.isArray(factoryConfig.plugins), 'pluginize(config,factoryConfig): factoryConfig.plugins should be null or an Array but is typeof ' + typeof factoryConfig.plugins, 'factoryConfig.plugins.wrongType');

    let configsAsArray = Array.isArray(configInstance) ? configInstance : [configInstance];
    configsAsArray = configsAsArray.map(entry => {
        entry.name = entry.name || 'pluginize(config)';

        return entry;
    })

    factoryConfig.configs.push(...configsAsArray);

    for (let plugin of factoryConfig.plugins) {
        throwErrorIf(typeof plugin != 'object' || Array.isArray(plugin), 'pluginize(config,factoryConfig): A plugin in factoryConfig.plugins is typeof ' + typeof plugin + ' but should be an object', 'factoryConfig.plugins.plugin.wrongType');
        throwErrorIf(Object.keys(plugin).some(key => !validPluginAttributes.includes(key)), `pluginize(config,factoryConfig): A plugin in factoryConfig.plugins has an invalid key. only ${validPluginAttributes.join(',')} is allowed.`, 'factoryConfig.plugins.plugin.wrongkey');
        throwErrorIf(Object.keys(plugin).some(key => typeof plugin[key] != 'function'), `pluginize(config,factoryConfig): A plugin in factoryConfig.plugins has an invalid type. It must be typeof function.`, 'factoryConfig.plugins.plugin.wrongkeytype');

        if (plugin.init)
            plugin.init(factoryConfig)
    }

    const runPromise = runPromiseFactory(factoryConfig);
    const run = runFactory(factoryConfig);

    let factory = { runPromise, run };

    for (let plugin of factoryConfig.plugins) {
        if (plugin.resolve)
            factory = plugin.resolve(factory) || factory;
    }

    return factory;
}

export { pluginize, SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook, SyncBreakableHook, AsyncBreakableHook }