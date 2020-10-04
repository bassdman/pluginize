import { pluginize } from '../src/index.js';
import { errorMode } from '../src/helpers/throwError.js';
import { SyncHook } from 'tapable';

errorMode('development');


describe("pluginize().applySync(config)", function() {
    it("should be typeof function", function() {
        expect(typeof pluginize).toBe('function')
    });

    it("should return an object if called without parameter", function() {
        const result = pluginize().applySync();
        expect(typeof result).toBe('object');
    });

    it("should return an object if called with an object", function() {
        const result = pluginize().applySync({});
        expect(typeof result).toBe('object');
    });

    it("should throw an error if invalid configattribute xyabc is added", function() {
        expect(() => {
            pluginize().applySync({ xyabc: true });
        }).toThrow('config.invalidKey');
    });

    it("should not throw an error for attribute plugins as an array", function() {
        expect(() => {
            return pluginize().applySync({ plugins: [] });
        }).not.toThrow();
    });
    it("should throw an error for attribute plugins if it is not an array", function() {
        expect(() => {
            return pluginize().applySync({ plugins: {} });
        }).toThrow('config.plugin.wrongtype');
    });
    it("should not throw an error for attribute init", function() {
        expect(() => {
            return pluginize().applySync({ init: function() {} });
        }).not.toThrow();
    });
    it("should throw an error for attribute init if it is not a function", function() {
        expect(() => {
            return pluginize().applySync({ init: {} });
        }).toThrow('config.init.wrongtype');
    });
    it("should add function xy to the context if it is returend in initfunction", function() {
        const result = pluginize().applySync({
            init: function() {
                return {
                    abc: function() {}
                }
            }
        });
        expect(typeof result.abc).toBe('function');
    });
    it("should ignore other return types then object for init function", function() {

        expect(() => {
            pluginize().applySync({
                init: function() {
                    return 5;
                }
            });
        }).not.toThrow();
    });
    it("should be valid to add a config attribute called 'hooks' = {}", function() {
        expect(() => {
            return pluginize().applySync({ hooks: {} });
        }).not.toThrow();
    });
    it("should throw an error if config attribute 'hooks' is not an object", function() {
        expect(() => {
            return pluginize().applySync({ hooks: [] });
        }).toThrow('config.hooks.wrongtype');
    });
    it("should throw an error if hooks named 'xyz' does not exist", function() {
        expect(() => {
            return pluginize().applySync({
                hooks: {
                    xyz: true
                }
            });
        }).toThrow('config.hooks.notDefined');
    });
    it("should have a hook called 'initPlugin'", function() {
        expect(() => {
            return pluginize().applySync({
                hooks: {
                    initPlugin: function() {}
                }
            });
        }).not.toThrow();
    });
    it("should have a hook called 'pluginsInitialized'", function() {
        expect(() => {
            return pluginize().applySync({
                hooks: {
                    pluginsInitialized: function() {}
                }
            });
        }).not.toThrow();
    });
    it("should be valid to add a config attribute called 'addHooks' = {}", function() {
        expect(() => {
            return pluginize().applySync({ addHooks: {} });
        }).not.toThrow();
    });
    it("should throw an error if config attribute 'addHooks' is not an object", function() {
        expect(() => {
            return pluginize().applySync({ addHooks: [] });
        }).toThrow('config.addHooks.wrongtype');
    });
    it("should not throw an error with addHook:{xyz} and hook:{xyz}", function() {
        expect(() => {
            return pluginize().applySync({
                debug: true,
                addHooks: {
                    xyz: new SyncHook()
                },
                hooks: {
                    xyz: function() {}
                }
            });
        }).not.toThrow();
    });
    it("should not throw an error if invalid configattribute xyabc is added and config.desactivateKeyCheck == true", function() {
        expect(() => {
            return pluginize().applySync({ xyabc: true, desactivateKeyCheck: true });
        }).not.toThrow();
    });

    it("should have a function desactivateKeyCheck in context", function() {
        const result = pluginize().applySync();

        expect(result.desactivateKeyCheck).toBeDefined();
    });

    it("should not throw an error if config-attribute 'return' is set", function() {
        expect(() => {
            return pluginize().applySync({ return: 'abc' });
        }).not.toThrow();
    });

    it("should return'hello world' if config-attribute 'return' is 'helloworld' with context.helloworld = 'hello world'", function() {
        const result = pluginize().applySync({
            return: 'helloworld',
            init() {
                return {
                    helloworld: 'hello world'
                }
            }
        });
        expect(result).toBe('hello world');
    });


    describe('config.hooks.preInitPlugin', function() {
        it("should have a hook 'preInitPlugin'", function() {
            const result = pluginize().applySync();

            expect(result.hooks.preInitPlugin).toBeDefined();
        });

        it("should be called before 'initPlugin'", function() {
            const order = [];
            pluginize().applySync({
                hooks: {
                    preInitPlugin() {
                        if (!order.includes('preInitPlugin'))
                            order.push('preInitPlugin');
                    },
                    initPlugin() {
                        if (!order.includes('initPlugin'))
                            order.push('initPlugin');
                    }
                }
            });

            expect(order).toEqual(['preInitPlugin', 'initPlugin']);
        });

        it("should change the config attribute _test to 'test' when it is changed", function() {
            const result = pluginize().applySync({
                _test: true,
                hooks: {
                    preInitPlugin(config) {
                        config.test = config._test;
                        delete config._test;
                    },
                },
                allowKeys: ['test']
            });

            expect(result.config.test).toEqual(true);
            expect(result.config._test).toBeUndefined();
        });

        it("should throw an error for an empty plugin without a name", function() {
            expect(() => {
                pluginize().applySync({
                    plugins: [{

                    }],
                });
            }).toThrow('plugin.noName');
        });

        it("should add name = 'default' to the config of an empty plugin", function() {
            const result = pluginize().applySync({
                plugins: [{

                }],
                hooks: {
                    preInitPlugin(config) {
                        if (!config.name)
                            config.name = 'default';
                    },
                },
            });

            expect(result.config.plugins[0].name).toEqual('default');
        });
    });
});