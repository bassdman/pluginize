let n = "production";

function o(o, i) { if ("development" == n) throw i; throw new Error(o) }

function i(n, i, e) { n && o(i, e) }

function e(o) { n = o }
const t = {
    name: "DefaultPlugins",
    plugins: [new function() {
        const n = ["name", "hooks", "init", "allowKeys", "desactivateKeyCheck", "plugins", "debug", "changeConfig"];
        let i = !1;
        return {
            name: "ValidateConfigPlugin",
            hooks: {
                initPlugin(o, e) { o.allowKeys && n.push(...o.allowKeys), o.desactivateKeyCheck && (i = o.desactivateKeyCheck) },
                pluginsInitialized(e) {
                    if (!i)
                        for (let i of e.plugins)
                            for (let e of Object.keys(i)) n.includes(e) || o(`Config attribute "${e}" is used but not allowed. Allowed are ${n.join(", ")}. \n                            You want to disable this proove? set desactivateKeyCheck:true.\n                            You want to allow another config attributes? Add allowKeys:['yourkeyname'].`, "config.invalidKey")
                }
            },
            init: () => ({ desactivateKeyCheck() { i = !0 } })
        }
    }, new function(n) { return { name: "InitHooksPlugin", allowKeys: ["addHooks", "hooks"], hooks: { initPlugin: function(n, o) { if (n.addHooks) { i(Array.isArray(n.addHooks) || "object" != typeof n.addHooks, `Error in plugin "${n.name}": config.addHooks must be an object but is a ${typeof n.addHooks}`, "config.addHooks.wrongtype"); for (let i of Object.keys(n.addHooks)) o.hooks[i] = n.addHooks[i] } if (n.hooks) { i(Array.isArray(n.hooks) || "object" != typeof n.hooks, `Error in plugin "${n.name}": config.hooks must be an object but is a ${typeof n.hooks}`, "config.hooks.wrongtype"); for (let e of Object.keys(n.hooks)) i(!o.hooks[e], 'There is no Hook named "' + e + '", declared in plugin ' + n.name + ' . Is it correctly written? If yes, initialize it first with config attribute "addHooks"', "config.hooks.notDefined"), o.hooks[e].tap(n.name, n.hooks[e]) } } }, init: function(n, o) { return o.config.hooks && o.config.hooks.preInitPlugin && o.hooks.preInitPlugin.tap("preInitPlugin", o.config.hooks.preInitPlugin), { addHooks: function(n) { for (let i of Object.keys(n)) o.hooks[i] = n[i] }, on: function(n, i, e) { if (!o.hooks[n]) throw new Error('Hook with name "' + n + '" does not exist. context.on(name, pluginname, fn) failed'); return o.hooks[n].tap(i, e) } } } } }, new function() { return { allowKeys: ["return"], name: "ReturnPlugin", hooks: { initPlugin(n, o) { n.return && (o.return = n.return) } } } }, new function() { const n = {}; return { allowKeys: ["rename"], name: "RenamePlugin", hooks: { initPlugin(o, i) { if (o.rename) { let i, e; for (e of Object.keys(o.rename)) i = o.rename[e], n[e] = i } }, return (o) { let i, e; for (e of Object.keys(n)) i = n[e], o[i] = o[e], delete o[e] } } } }, new function() { const n = []; return { allowKeys: ["delete"], name: "DeletePlugin", hooks: { initPlugin(o, i) { o.delete && n.push(...o.delete) }, return (o) { for (let i of n) delete o[i] } } } }]
};
class r {
    constructor() { this._listeners = {} }
    tap(n, o) {
        if (null == n) throw new Error("Hook.on(): should be on(name:string, listener:function) but name is undefined");
        if (null == o) throw new Error("Hook.on(): should be on(name:string, listener:function) but listener is undefined");
        this._listeners[n] = o
    }
    off(n) {
        if (null == n) throw new Error("Hook.off(): should be on(name:string, listener:function) but name is undefined");
        delete this._listeners[n]
    }
    listeners(n) { return n ? this._listeners[n] : Object.values(this._listeners) }
}
class l extends r { call(n) { const o = this.listeners(); for (let n of o) n(...arguments) } }
class u extends r { async promise(n) { const o = this.listeners(); for (let n of o) await n(...arguments) } }
class a extends r {
    call(n) {
        let o = n;
        const i = this.listeners();
        for (let n of i) {
            if (null == o) throw new Error("A listener in SyncWaterfallHook.trigger(context) returns null. This is not allowed. Did you forget returning sth in a listener?");
            o = n(o, ...arguments)
        }
        return o
    }
}
class s extends r { async promise(n) { let o = n; const i = this.listeners(); for (let n of i) o = await n(o, ...arguments); return o } }
class g extends r { call(n) { const o = this.listeners(); for (let n of o) { if (!n(...arguments)) return } } }
class f extends r { async call(n) { const o = this.listeners(); for (let n of o) { if (!await n(...arguments)) return } } }
const c = ["resolve", "init"];

function p(n = {}, o = {}) {
    const r = Object.assign({ configs: [], plugins: [] }, o);
    i(!Array.isArray(r.plugins), "pluginize(config,factoryConfig): factoryConfig.plugins should be null or an Array but is typeof " + typeof r.plugins, "factoryConfig.plugins.wrongType");
    let g = Array.isArray(n) ? n : [n];
    g = g.map((n => (n.name = n.name || "pluginize(config)", n))), r.configs.push(...g);
    for (let n of r.plugins) i("object" != typeof n || Array.isArray(n), "pluginize(config,factoryConfig): A plugin in factoryConfig.plugins is typeof " + typeof n + " but should be an object", "factoryConfig.plugins.plugin.wrongType"), i(Object.keys(n).some((n => !c.includes(n))), `pluginize(config,factoryConfig): A plugin in factoryConfig.plugins has an invalid key. only ${c.join(",")} is allowed.`, "factoryConfig.plugins.plugin.wrongkey"), i(Object.keys(n).some((o => "function" != typeof n[o])), "pluginize(config,factoryConfig): A plugin in factoryConfig.plugins has an invalid type. It must be typeof function.", "factoryConfig.plugins.plugin.wrongkeytype"), n.init && n.init(r);
    let f = {
        runPromise: function(n) {
            async function o(n, e) {
                if (e.log('- Add plugin "' + n.name + '"'), i(!(n = await e.hooks.preInitPlugin.promise(n, e) || n).name, `Plugin ${JSON.stringify(n)} has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.`, "plugin.noName"), i("function" == typeof n, `Plugin ${n.name} is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())`, "plugin.isFunction"), i("object" != typeof n || Array.isArray(n), `Plugin ${n.name} should be a configuration of type object, but is typeof ${typeof n}.`, "plugin.wrongType"), e.plugins.push(n), n.init) {
                    i("function" != typeof n.init, `Error in plugin "${n.name}": config.init must be a function but is a ${typeof n.init}`, "config.init.wrongtype"), e.log("- Execute init() function of plugin " + n.name);
                    const o = await n.init(n, e);
                    if (o && !o._context && "object" == typeof o && !Array.isArray(o))
                        for (let n of Object.keys(o) || {}) e.log("- add " + n + " to global context."), e[n] = o[n]
                }
                n.hooks && n.hooks.initPlugin && await e.hooks.initPlugin.tap(n.name, n.hooks.initPlugin), i(n.plugins && !Array.isArray(n.plugins), `Error in plugin "${n.name}": config.plugin must be an array but is an ${typeof n.plugins}`, "config.plugin.wrongtype");
                for (let i of n.plugins || []) await o(i, e);
                return e
            }
            return async function(r = {}) {
                let l = { plugins: [], config: r, _context: !0, addPlugin: o, hooks: { return: new u(["context"]), preInitPlugin: new s(["config", "context"]), pluginsInitialized: new u(["context"]), initPlugin: new u(["plugin", "context"]) }, log() { r.debug && console.log(...arguments) } };
                n.changeConfig && (r = await n.changeConfig(r, l)), i(null == r, "pluginize(config,factoryConfig): factoryConfig.changeConfig returns null but should return the modified config.", "factoryConfig.changeConfig.isNull"), i("object" != typeof r, "pluginize(config,factoryConfig): factoryConfig.changeConfig returns a " + typeof entry + "but should return an object.", "factoryConfig.changeConfig.wrongType"), i(Array.isArray(r), "pluginize(config,factoryConfig): factoryConfig.changeConfig returns an Array but should return an object.", "factoryConfig.changeConfig.wrongTypeArray"), r.debug && e("development"), r.name || (r.name = "PluginizeAsync"), l.log("Starting Pluginize."), await o(t, l);
                for (let i of n.configs) await o(i, l);
                await o(r, l);
                for (let n of l.plugins) i(null == n, "error in Pluginize(config): hook preInitPlugin - a listener returns null but should  return an object (the modified config)", "config.changeConfig.returnNull"), i(Array.isArray(n) || "object" != typeof n, "error in Pluginize(config): hook preInitPlugin - a listener should return an object (the modified config) but returns a " + typeof n, "config.changeConfig.wrongType"), l.log('- call hook "initPlugin" of plugin ' + n.name), await l.hooks.initPlugin.promise(n, l);
                return l.log('- call hook "pluginsInitialized"'), await l.hooks.pluginsInitialized.promise(l), await l.hooks.return.promise(l), l.return ? l[l.return] : l
            }
        }(r),
        run: function(n) {
            function o(n, e) {
                if (e.log('- Add plugin "' + n.name + '"'), i(null == (n = e.hooks.preInitPlugin.call(n, e) || n), "Error: Plugin is null", "conf.isNull"), i(!n.name, `Plugin ${JSON.stringify(n)} has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.`, "plugin.noName"), i("function" == typeof n, `Plugin ${n.name} is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())`, "plugin.isFunction"), i("object" != typeof n || Array.isArray(n), `Plugin ${n.name} should be a configuration of type object, but is typeof ${typeof n}.`, "plugin.wrongType"), e.plugins.push(n), n.init) {
                    i("function" != typeof n.init, `Error in plugin "${n.name}": config.init must be a function but is a ${typeof n.init}`, "config.init.wrongtype"), e.log("- Execute init() function of plugin " + n.name);
                    const o = n.init(n, e);
                    if (o && !o._context && "object" == typeof o && !Array.isArray(o))
                        for (let n of Object.keys(o) || {}) e.log("- add " + n + " to global context."), e[n] = o[n]
                }
                n.hooks && n.hooks.initPlugin && e.hooks.initPlugin.tap(n.name, n.hooks.initPlugin), i(n.plugins && !Array.isArray(n.plugins), `Error in plugin "${n.name}": config.plugin must be an array but is an ${typeof n.plugins}`, "config.plugin.wrongtype");
                for (let i of n.plugins || []) o(i, e);
                return e
            }
            return function(r = {}) {
                let u = { plugins: [], config: r, _context: !0, addPlugin: o, hooks: { return: new l(["context"]), preInitPlugin: new a(["config", "context"]), pluginsInitialized: new l(["context"]), initPlugin: new l(["plugin", "context"]) }, log() { r.debug && console.log(...arguments) } };
                n.changeConfig && (r = n.changeConfig(r, u)), i(null == r, "pluginize(config,factoryConfig): factoryConfig.changeConfig returns null but should return the modified config.", "factoryConfig.changeConfig.isNull"), i("object" != typeof r, "pluginize(config,factoryConfig): factoryConfig.changeConfig returns a " + typeof entry + "but should return an object.", "factoryConfig.changeConfig.wrongType"), i(Array.isArray(r), "pluginize(config,factoryConfig): factoryConfig.changeConfig returns an Array but should return an object.", "factoryConfig.changeConfig.wrongTypeArray"), r.debug && e("development"), r.name || (r.name = "Pluginize"), u.log("Starting Pluginize."), o(t, u);
                for (let i of n.configs) o(i, u);
                o(r, u);
                for (let n of u.plugins) i(null == n, "error in Pluginize(config): hook preInitPlugin - a listener returns null but should  return an object (the modified config)", "config.changeConfig.returnNull"), i(Array.isArray(n) || "object" != typeof n, "error in Pluginize(config): hook preInitPlugin - a listener should return an object (the modified config) but returns a " + typeof n, "config.changeConfig.wrongType"), u.log('- call hook "initPlugin" of plugin ' + n.name), u.hooks.initPlugin.call(n, u);
                return u.log('- call hook "pluginsInitialized"'), u.hooks.pluginsInitialized.call(u), u.hooks.return.call(u), u.return ? u[u.return] : u
            }
        }(r)
    };
    for (let n of r.plugins) n.resolve && (f = n.resolve(f) || f);
    return f
}
export { f as AsyncBreakableHook, u as AsyncHook, s as AsyncWaterfallHook, g as SyncBreakableHook, l as SyncHook, a as SyncWaterfallHook, p as pluginize };