import { throwErrorIf } from '../helpers/throwError.js';

function InitHooksPlugin(ctx) {
    return {
        name: 'InitHooksPlugin',
        allowKeys: ['addHooks', 'hooks'],
        hooks: {
            initPlugin: function(config, ctx) {
                if (config.addHooks) {
                    throwErrorIf(Array.isArray(config.addHooks) || typeof config.addHooks != 'object', `Error in plugin "${config.name}": config.addHooks must be an object but is a ${typeof config.addHooks}`, 'config.addHooks.wrongtype')
                    for (let hookname of Object.keys(config.addHooks)) {
                        ctx.hooks[hookname] = config.addHooks[hookname];
                    }
                }

                if (config.hooks) {
                    throwErrorIf(Array.isArray(config.hooks) || typeof config.hooks != 'object', `Error in plugin "${config.name}": config.hooks must be an object but is a ${typeof config.hooks}`, 'config.hooks.wrongtype')
                    for (let hookname of Object.keys(config.hooks)) {

                        throwErrorIf(!ctx.hooks[hookname], 'There is no Hook named "' + hookname + '", declared in plugin ' + config.name + ' . Is it correctly written? If yes, initialize it first with config attribute "addHooks"', 'config.hooks.notDefined');

                        ctx.hooks[hookname].tap(config.name, config.hooks[hookname]);
                    }
                }
            }
        },
        onInit: function(config, pluginConfig, ctx) {
            if (config.hooks && config.hooks.preInitPlugin)
                ctx.hooks.preInitPlugin.tap('preInitPlugin', config.hooks.preInitPlugin);

            return {
                addHooks: function(obj) {
                    for (let key of Object.keys(obj)) {
                        ctx.hooks[key] = obj[key];
                    }
                },
                on: function(name, pluginname, fn) {
                    if (!ctx.hooks[name])
                        throw new Error('Hook with name "' + name + '" does not exist. context.on(name, pluginname, fn) failed');

                    return ctx.hooks[name].tap(pluginname, fn);
                }
            }


        }
    }
}

export { InitHooksPlugin }