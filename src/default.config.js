import { InitHooksPlugin } from './plugins/hooks.plugin.js';
import { ValidateConfigPlugin } from './plugins/validateConfig.plugin.js'

const DefaultConfig = {
    name: 'DefaultPlugins',
    plugins: [
        /*
            Enables adding {
                desactivateKeyCheck: true|false,
                allowKeys: ['keyx']
            } to the config.

            Adds structuredData.on() and structuredData.addHooks() to the interface
        */
        new ValidateConfigPlugin(),

        /*
            Enables adding {
                hooks: { foo: 'bar' },
                addHooks: { foo: 'bar' }
            } to the config.

            Adds structuredData.on() and structuredData.addHooks() to the interface
        */
        new InitHooksPlugin(),
    ]
}

export { DefaultConfig };