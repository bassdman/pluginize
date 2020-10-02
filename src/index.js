import { PluginizeSync as PluginizeSyncInstance, PluginizeSync } from './Pluginize';
import { PluginizeAsync as PluginizeAsyncInstance } from './PluginizeAsync';

function instance(config = {}) {
    let instance = config.async ? PluginizeAsyncInstance : PluginizeSyncInstance;

    if (config.apply) {
        let configsAsArray = Array.isArray(config.apply) ? config.apply : [config.apply];
        configsAsArray = configsAsArray.map(entry => { entry.name = entry.name || 'Instance(config)'; return entry; })

        console.log(configsAsArray)
        instance.pluginsToApply = configsAsArray;
    }

    return instance;
}

const Pluginize = instance();
const PluginizeAsync = instance({ async: true });

export { Pluginize, PluginizeAsync, instance }