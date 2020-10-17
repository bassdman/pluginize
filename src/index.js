import { runPromiseFactory } from './runPromise';
import { runFactory } from './run';
import { SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook, SyncBreakableHook, AsyncBreakableHook } from './helpers/hooks.js';

function pluginizeFactory(_factoryConfig = {}, staticAttributes = {}) {

    function _pluginize(configInstance = {}) {
        const factoryConfig = Object.assign({
            configs: [],
        }, _factoryConfig);



        let configsAsArray = Array.isArray(configInstance) ? configInstance : [configInstance];
        configsAsArray = configsAsArray.map(entry => {
            entry.name = entry.name || 'pluginize(config)';

            return entry;
        })

        factoryConfig.configs.push(...configsAsArray);

        const runPromise = runPromiseFactory(factoryConfig);
        const run = runFactory(factoryConfig);

        let factory = new pluginizeFactory(factoryConfig, { runPromise, run, factoryConfig: factoryConfig });

        return factory;
    }

    for (let key of Object.keys(staticAttributes)) {
        _pluginize[key] = staticAttributes[key];
    }

    return _pluginize;

}

const pluginize = pluginizeFactory({});
export { pluginize, SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook, SyncBreakableHook, AsyncBreakableHook }