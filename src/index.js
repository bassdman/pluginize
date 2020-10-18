import { runPromiseFactory } from './runPromise';
import { runFactory } from './run';
import { SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook, SyncBreakableHook, AsyncBreakableHook } from './helpers/hooks.js';
import cloneDeep from 'lodash.clonedeep';

function pluginizeFactory(_factoryConfig = {}, staticAttributes = {}) {

    function _pluginize(configInstance = {}) {
        const factoryConfig = cloneDeep(Object.assign({
            configs: [],
        }, _factoryConfig));



        let configsAsArray = Array.isArray(configInstance) ? configInstance : [configInstance];
        configsAsArray = configsAsArray.map(entry => {
            entry.name = entry.name || 'pluginize(config)';

            return entry;
        })

        factoryConfig.configs.push(...configsAsArray);

        const runPromise = runPromiseFactory(factoryConfig);
        const run = runFactory(factoryConfig);

        let factory = new pluginizeFactory(factoryConfig, { runPromise, run, factoryConfig: Object.assign(factoryConfig, { level: 1 }) });

        return factory;
    }

    for (let key of Object.keys(staticAttributes)) {
        _pluginize[key] = staticAttributes[key];
    }

    return _pluginize;

}

const pluginize = pluginizeFactory({ level: 0 });
export { pluginize, SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook, SyncBreakableHook, AsyncBreakableHook }