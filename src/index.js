import { applyFactory } from './apply';
import { applySyncFactory } from './applySync';
import { throwErrorIf, errorMode } from './helpers/throwError.js';
import { SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook, SyncBreakableHook, AsyncBreakableHook } from './helpers/hooks.js';

function pluginize(configInstance = {}, factoryConfig = {}) {
    Object.assign(factoryConfig, {
        configs: []
    });

    let configsAsArray = Array.isArray(configInstance) ? configInstance : [configInstance];
    configsAsArray = configsAsArray.map(entry => {
        entry.name = entry.name || 'pluginize(config)';

        return entry;
    })


    factoryConfig.configs.push(...configsAsArray);

    const apply = applyFactory(factoryConfig);
    const applySync = applySyncFactory(factoryConfig);

    return { apply, applySync };
}

export { pluginize, SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook, SyncBreakableHook, AsyncBreakableHook }