import { throwError } from '../helpers/throwError.js';


function ValidateConfigPlugin() {
    const usedKeys = ['name', 'hooks', 'init', 'allowKeys', 'disableKeyCheck', 'plugins', 'debug', 'preInit'];
    let disableKeyCheck = false;

    return {
        name: 'ValidateConfigPlugin',
        hooks: {
            initPlugin(config, ctx) {
                if (config.allowKeys)
                    usedKeys.push(...config.allowKeys);

                if (config.disableKeyCheck)
                    disableKeyCheck = config.disableKeyCheck;
            },
            pluginsInitialized(ctx) {
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
        },
        init() {
            return {
                disableKeyCheck() {
                    disableKeyCheck = true;
                }
            }
        }
    }
}

export { ValidateConfigPlugin }