import { InitHooksPlugin } from './plugins/hooks.plugin.js';
import { ValidateConfigPlugin } from './plugins/validateConfig.plugin.js'
import { ReturnPlugin } from './plugins/return.plugin.js'


const DefaultConfig = {
    name: 'DefaultPlugins',
    plugins: [
        /*
            Enables adding {
                desactivateKeyCheck: true|false,
                allowKeys: ['keyx']
            } to the config.

            Adds pluginize.on() and pluginize.addHooks() to the interface
        */
        new ValidateConfigPlugin(),

        /*
            Enables adding {
                hooks: { foo: 'bar' },
                addHooks: { foo: 'bar' }
            } to the config.

            Adds pluginize.on() and pluginize.addHooks() to the interface
        */
        new InitHooksPlugin(),

        /*
            Adds pluginize.return to the interface
        */
        new ReturnPlugin(),
    ]
}

export { DefaultConfig };