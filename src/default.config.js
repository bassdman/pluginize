import { InitHooksPlugin } from './plugins/hooks.plugin.js';
import { ValidateConfigPlugin } from './plugins/validateConfig.plugin.js'
import { ReturnPlugin } from './plugins/return.plugin.js'
import { RenamePlugin } from './plugins/rename.plugin.js'
import { DeletePlugin } from './plugins/delete.plugin.js'

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

        /*
            Enables adding {
                rename: { foo: 'bar' },
            } to the config.
        */
        new RenamePlugin(),

        /*
            Enables adding {
                delete: ['foo','bar'],
            } to the config.
        */
        new DeletePlugin()
    ]
}

export { DefaultConfig };