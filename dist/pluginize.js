(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.pluginize = {}));
}(this, (function (exports) { 'use strict';

    let _errorMode = 'production';

    function throwError(message, identifier) {
        if (_errorMode == 'development')
            throw identifier;

        throw new Error(message);
    }

    function throwErrorIf(condition, message, identifier) {
        if (condition)
            throwError(message, identifier);
    }

    function errorMode(errorMode) {
        _errorMode = errorMode;
    }

    function InitHooksPlugin(ctx) {
        return {
            name: 'InitHooksPlugin',
            allowKeys: ['addHooks', 'hooks'],
            hooks: {
                initPlugin: function(config, ctx) {
                    if (config.addHooks) {
                        throwErrorIf(Array.isArray(config.addHooks) || typeof config.addHooks != 'object', `Error in plugin "${config.name}": config.addHooks must be an object but is a ${typeof config.addHooks}`, 'config.addHooks.wrongtype');
                        for (let hookname of Object.keys(config.addHooks)) {
                            ctx.hooks[hookname] = config.addHooks[hookname];
                        }
                    }

                    if (config.hooks) {
                        throwErrorIf(Array.isArray(config.hooks) || typeof config.hooks != 'object', `Error in plugin "${config.name}": config.hooks must be an object but is a ${typeof config.hooks}`, 'config.hooks.wrongtype');
                        for (let hookname of Object.keys(config.hooks)) {

                            throwErrorIf(!ctx.hooks[hookname], 'There is no Hook named "' + hookname + '", declared in plugin ' + config.name + ' . Is it correctly written? If yes, initialize it first with config attribute "addHooks"', 'config.hooks.notDefined');

                            ctx.hooks[hookname].tap(config.name, config.hooks[hookname]);
                        }
                    }
                }
            },
            init: function(conf, ctx) {
                if (ctx.config.hooks && ctx.config.hooks.preInitPlugin)
                    ctx.hooks.preInitPlugin.tap('preInitPlugin', ctx.config.hooks.preInitPlugin);

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

    function ValidateConfigPlugin() {
        const usedKeys = ['name', 'hooks', 'init', 'allowKeys', 'desactivateKeyCheck', 'plugins', 'debug', 'preInit'];
        let desactivateKeyCheck = false;

        return {
            name: 'ValidateConfigPlugin',
            hooks: {
                initPlugin(config, ctx) {
                    if (config.allowKeys)
                        usedKeys.push(...config.allowKeys);

                    if (config.desactivateKeyCheck)
                        desactivateKeyCheck = config.desactivateKeyCheck;
                },
                pluginsInitialized(ctx) {
                    if (desactivateKeyCheck)
                        return;

                    for (let plugin of ctx.plugins) {
                        for (let key of Object.keys(plugin)) {
                            if (!usedKeys.includes(key))
                                throwError(`Config attribute "${key}" is used but not allowed. Allowed are ${usedKeys.join(', ')}. 
                            You want to disable this proove? set desactivateKeyCheck:true.
                            You want to allow another config attributes? Add allowKeys:['yourkeyname'].`, 'config.invalidKey');
                        }
                    }
                },
            },
            init() {
                return {
                    desactivateKeyCheck() {
                        desactivateKeyCheck = true;
                    }
                }
            }
        }
    }

    function ReturnPlugin() {

        return {
            allowKeys: ['return'],
            name: 'ReturnPlugin',
            hooks: {
                initPlugin(config, ctx) {
                    if (config.return) {
                        ctx.return = config.return;
                    }
                },
            },
        }
    }

    function RenamePlugin() {
        const renamed = {};
        return {
            allowKeys: ['rename'],
            name: 'RenamePlugin',
            hooks: {
                initPlugin(config, ctx) {
                    if (config.rename) {
                        let newKey, oldKey;
                        for (oldKey of Object.keys(config.rename)) {
                            newKey = config.rename[oldKey];

                            renamed[oldKey] = newKey;
                        }
                    }
                },
                return (ctx) {
                    let newKey, oldKey;
                    for (oldKey of Object.keys(renamed)) {
                        newKey = renamed[oldKey];

                        ctx[newKey] = ctx[oldKey];
                        delete ctx[oldKey];
                    }
                },
            },
        }
    }

    function DeletePlugin() {
        const toDelete = [];
        return {
            allowKeys: ['delete'],
            name: 'DeletePlugin',
            hooks: {
                initPlugin(config, ctx) {
                    if (config.delete) {
                        toDelete.push(...config.delete);
                    }
                },
                return (ctx) {
                    for (let key of toDelete) {

                        delete ctx[key];
                    }
                },
            },
        }
    }

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
    };

    class Hook {
        constructor() {
            this._listeners = {};
        }

        tap(name, listener) {
            if (name == undefined)
                throw new Error('Hook.on(): should be on(name:string, listener:function) but name is undefined');
            if (listener == undefined)
                throw new Error('Hook.on(): should be on(name:string, listener:function) but listener is undefined');

            this._listeners[name] = listener;
        }
        off(name) {
            if (name == undefined)
                throw new Error('Hook.off(): should be on(name:string, listener:function) but name is undefined');

            delete this._listeners[name];
        }
        listeners(name) {
            if (name)
                return this._listeners[name];
            else
                return Object.values(this._listeners);
        }
    }

    class SyncHook extends Hook {
        call(ctx) {
            const events = this.listeners();
            for (let event of events) {
                event(...arguments);
            }
        }
    }

    class AsyncHook extends Hook {
        async promise(ctx) {
            const events = this.listeners();
            for (let event of events) {
                await event(...arguments);
            }
        }
    }

    class SyncWaterfallHook extends Hook {
        call(ctx) {
            let result = ctx;
            const events = this.listeners();

            for (let event of events) {
                if (result == null)
                    throw new Error('A listener in SyncWaterfallHook.trigger(context) returns null. This is not allowed. Did you forget returning sth in a listener?')
                result = event(result, ...arguments);
            }
            return result;
        }
    }

    class AsyncWaterfallHook extends Hook {
        async promise(ctx) {
            let result = ctx;
            const events = this.listeners();

            for (let event of events) {
                result = await event(result, ...arguments);
            }
            return result;
        }
    }

    class SyncBreakableHook extends Hook {
        call(ctx) {
            const events = this.listeners();

            for (let event of events) {
                const result = event(...arguments);
                if (!result)
                    return;
            }
        }
    }

    class AsyncBreakableHook extends Hook {
        async call(ctx) {
            const events = this.listeners();

            for (let event of events) {
                const result = await event(...arguments);
                if (!result)
                    return;
            }
        }
    }

    function runPromiseFactory(factoryConfig) {
        async function addPluginAsync(conf, ctx) {

            ctx.log('- Add plugin "' + conf.name + '"');

            conf = await ctx.hooks.preInitPlugin.promise(conf, ctx) || conf;

            throwErrorIf(!conf.name, `Plugin ${JSON.stringify(conf)} has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.`, 'plugin.noName');
            throwErrorIf(typeof conf === 'function', `Plugin ${conf.name} is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())`, 'plugin.isFunction');
            throwErrorIf(typeof conf !== 'object' || Array.isArray(conf), `Plugin ${conf.name} should be a configuration of type object, but is typeof ${typeof conf}.`, 'plugin.wrongType');

            ctx.plugins.push(conf);

            if (conf.init) {
                throwErrorIf(typeof conf.init !== 'function', `Error in plugin "${conf.name}": config.init must be a function but is a ${typeof conf.init}`, 'config.init.wrongtype');
                ctx.log(`- Execute init() function of plugin ${conf.name}`);
                const globals = await conf.init(conf, ctx);
                if (globals && !globals._context && typeof globals == 'object' && !Array.isArray(globals)) {
                    for (let key of Object.keys(globals) || {}) {
                        ctx.log('- add ' + key + ' to global context.');
                        ctx[key] = globals[key];
                    }
                }
            }

            if (conf.hooks && conf.hooks.initPlugin) {
                await ctx.hooks.initPlugin.tap(conf.name, conf.hooks.initPlugin);
            }

            throwErrorIf(conf.plugins && !Array.isArray(conf.plugins), `Error in plugin "${conf.name}": config.plugin must be an array but is an ${typeof conf.plugins}`, 'config.plugin.wrongtype');

            for (let _plugin of conf.plugins || []) {
                await addPluginAsync(_plugin, ctx);
            }
            return ctx;
        }

        return async function runPromise(config = {}) {
            let ctx = {
                plugins: [],
                config,
                _context: true,
                addPlugin: addPluginAsync,
                hooks: {
                    return: new AsyncHook(['context']),
                    preInitPlugin: new AsyncWaterfallHook(['config', 'context']),
                    pluginsInitialized: new AsyncHook(['context']),
                    initPlugin: new AsyncHook(['plugin', 'context']),
                },
                log() {
                    if (config.debug)
                        console.log(...arguments);
                }
            };

            if (factoryConfig.preInit)
                config = await factoryConfig.preInit(config, ctx);

            throwErrorIf(config == null, 'pluginize(config,factoryConfig): factoryConfig.preInit returns null but should return the modified config.', 'factoryConfig.preInit.isNull');
            throwErrorIf(typeof config !== 'object', 'pluginize(config,factoryConfig): factoryConfig.preInit returns a ' + typeof entry + 'but should return an object.', 'factoryConfig.preInit.wrongType');
            throwErrorIf(Array.isArray(config), 'pluginize(config,factoryConfig): factoryConfig.preInit returns an Array but should return an object.', 'factoryConfig.preInit.wrongTypeArray');


            if (config.debug)
                errorMode('development');

            if (!config.name)
                config.name = 'PluginizeAsync';

            ctx.log('Starting Pluginize.');
            await addPluginAsync(DefaultConfig, ctx);

            for (let pluginTorunPromise of factoryConfig.configs)
                await addPluginAsync(pluginTorunPromise, ctx);

            await addPluginAsync(config, ctx);


            for (let _plugin of ctx.plugins) {
                throwErrorIf(_plugin == null, "error in Pluginize(config): hook preInitPlugin - a listener returns null but should  return an object (the modified config)", "config.preInit.returnNull");
                throwErrorIf(Array.isArray(_plugin) || typeof _plugin !== 'object', "error in Pluginize(config): hook preInitPlugin - a listener should return an object (the modified config) but returns a " + typeof _plugin, "config.preInit.wrongType");


                ctx.log('- call hook "initPlugin" of plugin ' + _plugin.name);
                await ctx.hooks.initPlugin.promise(_plugin, ctx);
            }

            ctx.log('- call hook "pluginsInitialized"');
            await ctx.hooks.pluginsInitialized.promise(ctx);

            await ctx.hooks.return.promise(ctx);

            if (ctx.return) {
                return ctx[ctx.return];
            } else
                return ctx;
        }
    }

    function runFactory(factoryConfig) {
        function addPluginSync(conf, ctx) {

            ctx.log('- Add plugin "' + conf.name + '"');

            conf = ctx.hooks.preInitPlugin.call(conf, ctx) || conf;

            throwErrorIf(conf == null, `Error: Plugin is null`, 'conf.isNull');
            throwErrorIf(!conf.name, `Plugin ${JSON.stringify(conf)} has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.`, 'plugin.noName');
            throwErrorIf(typeof conf === 'function', `Plugin ${conf.name} is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())`, 'plugin.isFunction');
            throwErrorIf(typeof conf !== 'object' || Array.isArray(conf), `Plugin ${conf.name} should be a configuration of type object, but is typeof ${typeof conf}.`, 'plugin.wrongType');

            ctx.plugins.push(conf);

            if (conf.init) {
                throwErrorIf(typeof conf.init !== 'function', `Error in plugin "${conf.name}": config.init must be a function but is a ${typeof conf.init}`, 'config.init.wrongtype');

                ctx.log(`- Execute init() function of plugin ${conf.name}`);
                const globals = conf.init(conf, ctx);

                if (globals && !globals._context && typeof globals == 'object' && !Array.isArray(globals)) {
                    for (let key of Object.keys(globals) || {}) {
                        ctx.log('- add ' + key + ' to global context.');
                        ctx[key] = globals[key];
                    }
                }

            }

            if (conf.hooks && conf.hooks.initPlugin) {
                ctx.hooks.initPlugin.tap(conf.name, conf.hooks.initPlugin);
            }

            throwErrorIf(conf.plugins && !Array.isArray(conf.plugins), `Error in plugin "${conf.name}": config.plugin must be an array but is an ${typeof conf.plugins}`, 'config.plugin.wrongtype');

            for (let _plugin of conf.plugins || []) {
                addPluginSync(_plugin, ctx);
            }

            return ctx;
        }

        return function run(config = {}) {
            let ctx = {
                plugins: [],
                config,
                _context: true,
                addPlugin: addPluginSync,
                hooks: {
                    return: new SyncHook(['context']),
                    preInitPlugin: new SyncWaterfallHook(['config', 'context']),
                    pluginsInitialized: new SyncHook(['context']),
                    initPlugin: new SyncHook(['plugin', 'context']),
                },
                log() {
                    if (config.debug)
                        console.log(...arguments);
                }
            };

            const lastConfig = factoryConfig.configs[factoryConfig.configs.length - 1];
            if (lastConfig.preInit)
                config = lastConfig.preInit(config, ctx) || config;

            throwErrorIf(config == null, 'pluginize(config,factoryConfig): factoryConfig.preInit returns null but should return the modified config.', 'factoryConfig.preInit.isNull');
            throwErrorIf(typeof config !== 'object', 'pluginize(config,factoryConfig): factoryConfig.preInit returns a ' + typeof entry + 'but should return an object.', 'factoryConfig.preInit.wrongType');
            throwErrorIf(Array.isArray(config), 'pluginize(config,factoryConfig): factoryConfig.preInit returns an Array but should return an object.', 'factoryConfig.preInit.wrongTypeArray');


            if (config.debug)
                errorMode('development');

            if (!config.name)
                config.name = 'Pluginize';

            ctx.log('Starting Pluginize.');
            addPluginSync(DefaultConfig, ctx);

            for (let pluginTorunPromise of factoryConfig.configs)
                addPluginSync(pluginTorunPromise, ctx);

            addPluginSync(config, ctx);


            for (let _plugin of ctx.plugins) {
                throwErrorIf(_plugin == null, "error in Pluginize(config): hook preInitPlugin - a listener returns null but should  return an object (the modified config)", "config.preInit.returnNull");
                throwErrorIf(Array.isArray(_plugin) || typeof _plugin !== 'object', "error in Pluginize(config): hook preInitPlugin - a listener should return an object (the modified config) but returns a " + typeof _plugin, "config.preInit.wrongType");

                ctx.log('- call hook "initPlugin" of plugin ' + _plugin.name);
                ctx.hooks.initPlugin.call(_plugin, ctx);
            }

            ctx.log('- call hook "pluginsInitialized"');
            ctx.hooks.pluginsInitialized.call(ctx);

            ctx.hooks.return.call(ctx);

            if (ctx.return) {
                return ctx[ctx.return];
            } else
                return ctx;
        }
    }

    function pluginizeFactory(_factoryConfig = {}, staticAttributes = {}) {

        function _pluginize(configInstance = {}) {
            const factoryConfig = Object.assign({
                configs: [],
            }, _factoryConfig);



            let configsAsArray = Array.isArray(configInstance) ? configInstance : [configInstance];
            configsAsArray = configsAsArray.map(entry => {
                entry.name = entry.name || 'pluginize(config)';

                return entry;
            });

            factoryConfig.configs.push(...configsAsArray);

            const runPromise = runPromiseFactory(factoryConfig);
            const run = runFactory(factoryConfig);

            let factory = new pluginizeFactory(factoryConfig, { runPromise, run, factoryConfig: factoryConfig });

            return factory;
        }

        for (let key of Object.keys(staticAttributes)) {
            _pluginize[key] = staticAttributes[key];
        }

        return _pluginize;

    }

    const pluginize = pluginizeFactory({});

    exports.AsyncBreakableHook = AsyncBreakableHook;
    exports.AsyncHook = AsyncHook;
    exports.AsyncWaterfallHook = AsyncWaterfallHook;
    exports.SyncBreakableHook = SyncBreakableHook;
    exports.SyncHook = SyncHook;
    exports.SyncWaterfallHook = SyncWaterfallHook;
    exports.pluginize = pluginize;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
