import { applyFactory } from './apply';
import { applySyncFactory } from './applySync';
import { SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook, SyncBreakableHook, AsyncBreakableHook } from './helpers/hooks.js';

function pluginize(configInstance = {}) {
    const configsFromInstance = [];

    let configsAsArray = Array.isArray(configInstance) ? configInstance : [configInstance];
    configsAsArray = configsAsArray.map(entry => { entry.name = entry.name || 'pluginize(config)'; return entry; })

    configsFromInstance.push(...configsAsArray);



    const apply = applyFactory(configsFromInstance, configInstance);
    const applySync = applySyncFactory(configsFromInstance, configInstance);

    return { apply, applySync };
}

export { pluginize, SyncHook, AsyncHook, SyncWaterfallHook, AsyncWaterfallHook, SyncBreakableHook, AsyncBreakableHook }