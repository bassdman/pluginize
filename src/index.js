import { PluginizeSync as PluginizeSyncInstance, PluginizeSync } from './Pluginize';
import { PluginizeAsync as PluginizeAsyncInstance } from './PluginizeAsync';

function Instance(config) {
    let instance = PluginizeSyncInstance;


    if (config) {
        let configsAsArray = Array.isArray(config) ? config : [config];
        configsAsArray = configsAsArray.map(entry => { entry.name = entry.name || 'Instance(config)'; return entry; })

        console.log(configsAsArray)
        instance.pluginsToApply = configsAsArray;
    }

    return instance;
}

function InstanceAsync(config = {}) {
    let instance = PluginizeAsyncInstance;

    if (config) {
        let configsAsArray = Array.isArray(config) ? config : [config];
        configsAsArray = configsAsArray.map(entry => { entry.name = entry.name || 'InstanceAsync(config)'; return entry; })

        instance.pluginsToApply = configsAsArray;
    }

    return instance;
}

const Pluginize = Instance();
const PluginizeAsync = InstanceAsync();

export { Pluginize, PluginizeAsync, Instance, InstanceAsync }