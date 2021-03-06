import { throwError } from '../helpers/throwError.js';


function ValidateConfigPlugin() {
    const usedKeys = ['name', 'onInit', 'onPreInit', 'allowKeys', 'disableKeyCheck', 'plugins', 'debug', 'onInitPlugin', 'onPreInitPlugin', '_pluginizeInternal'];
    let disableKeyCheck = false;

    return {
        _pluginizeInternal: true,
        name: 'ValidateConfigPlugin',
        onInitPlugin(config, ctx) {
            if (config.allowKeys)
                usedKeys.push(...config.allowKeys);

            if (config.disableKeyCheck)
                disableKeyCheck = config.disableKeyCheck;
        },
        onPluginsInitialized(ctx) {
            if (disableKeyCheck)
                return;

            for (let plugin of ctx.plugins) {
                for (let key of Object.keys(plugin)) {
                    if (!usedKeys.includes(key))
                        throwError(`Config attribute "${key}" is used but not allowed. Allowed are ${usedKeys.join(', ')}. 
                            You want to disable this proove? set disableKeyCheck:true.
                            You want to allow another config attributes? Add allowKeys:['yourkeyname'].`, 'config.invalidKey')
                }
            }
        },
        onInit() {
            return {
                disableKeyCheck() {
                    disableKeyCheck = true;
                }
            }
        }
    }
}

export { ValidateConfigPlugin }