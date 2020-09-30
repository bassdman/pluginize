import { PluginizeSync as PluginizeSyncInstance, PluginizeSync } from './Pluginize';
import { PluginizeAsync as PluginizeAsyncInstance } from './PluginizeAsync';

function Instance(config = {}) {
    let instance = PluginizeSyncInstance;
    config.name = config.name || 'Factory(config)';
    instance.factoryApply = config;

    return instance;
}

function InstanceAsync(config = {}) {
    let instance = PluginizeAsyncInstance;
    config.name = config.name || 'Factory(config)';
    instance.factoryApply = config;

    return instance;
}

const Pluginize = Instance();
console.log(Pluginize);

const PluginizeAsync = InstanceAsync();

export { Pluginize, PluginizeAsync, Instance, InstanceAsync, Instance as Factory, InstanceAsync as FactoryAsync }