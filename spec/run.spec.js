import { pluginize, SyncHook } from '../src/index.js';
import { errorMode } from '../src/helpers/throwError.js';

errorMode('development');


describe("pluginize().run(config)", function() {
    it("should be typeof function", function() {
        expect(typeof pluginize).toBe('function')
    });

    it("should return an object if called without parameter", function() {
        const result = pluginize().run();
        expect(typeof result).toBe('object');
    });

    it("should return an object if called with an object", function() {
        const result = pluginize().run({});
        expect(typeof result).toBe('object');
    });

    it("should throw an error if invalid configattribute xyabc is added", function() {
        expect(() => {
            pluginize().run({ xyabc: true });
        }).toThrow('config.invalidKey');
    });

    it("should not throw an error for attribute plugins as an array", function() {
        expect(() => {
            return pluginize().run({ plugins: [] });
        }).not.toThrow();
    });
    it("should throw an error for attribute plugins if it is not an array", function() {
        expect(() => {
            return pluginize().run({ plugins: {} });
        }).toThrow('config.plugin.wrongtype');
    });
    it("should not throw an error for attribute onInit", function() {
        expect(() => {
            return pluginize().run({ onInit: function() {} });
        }).not.toThrow();
    });
    it("should throw an error for attribute onInit if it is not a function", function() {
        expect(() => {
            return pluginize().run({ onInit: {} });
        }).toThrow('config.onInit.wrongtype');
    });
    it("should add function xy to the context if it is returend in initfunction", function() {
        const result = pluginize().run({
            onInit: function() {
                return {
                    abc: function() {}
                }
            }
        });
        expect(typeof result.abc).toBe('function');
    });
    it("should ignore other return types then object for onInit function", function() {

        expect(() => {
            pluginize().run({
                onInit: function() {
                    return 5;
                }
            });
        }).not.toThrow();
    });
    it("should be valid to add a config attribute called 'hooks' = {}", function() {
        expect(() => {
            return pluginize().run({ hooks: {} });
        }).not.toThrow();
    });
    it("should throw an error if config attribute 'hooks' is not an object", function() {
        expect(() => {
            return pluginize().run({ hooks: [] });
        }).toThrow('config.hooks.wrongtype');
    });
    it("should throw an error if hooks named 'xyz' does not exist", function() {
        expect(() => {
            return pluginize().run({
                hooks: {
                    xyz: true
                }
            });
        }).toThrow('config.hooks.notDefined');
    });
    it("should have a hook called 'initPlugin'", function() {
        expect(() => {
            return pluginize().run({
                hooks: {
                    initPlugin: function() {}
                }
            });
        }).not.toThrow();
    });
    it("should have a hook called 'pluginsInitialized'", function() {
        expect(() => {
            return pluginize().run({
                hooks: {
                    pluginsInitialized: function() {}
                }
            });
        }).not.toThrow();
    });
    it("should be valid to add a config attribute called 'addHooks' = {}", function() {
        expect(() => {
            return pluginize().run({ addHooks: {} });
        }).not.toThrow();
    });
    it("should throw an error if config attribute 'addHooks' is not an object", function() {
        expect(() => {
            return pluginize().run({ addHooks: [] });
        }).toThrow('config.addHooks.wrongtype');
    });
    it("should not throw an error with addHook:{xyz} and hook:{xyz}", function() {
        expect(() => {
            return pluginize().run({
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
    it("should not throw an error if invalid configattribute xyabc is added and config.disableKeyCheck == true", function() {
        expect(() => {
            return pluginize().run({ xyabc: true, disableKeyCheck: true });
        }).not.toThrow();
    });

    it("should have a function disableKeyCheck in context", function() {
        const result = pluginize().run();

        expect(result.disableKeyCheck).toBeDefined();
    });

    describe('config.hooks.preInitPlugin', function() {
        it("should have a hook 'preInitPlugin'", function() {
            const result = pluginize().run();

            expect(result.hooks.preInitPlugin).toBeDefined();
        });

        it("should be called before 'initPlugin'", function() {
            const order = [];
            pluginize().run({
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
            const result = pluginize().run({
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
                pluginize().run({
                    plugins: [{

                    }],
                });
            }).toThrow('plugin.noName');
        });

        it("should add name = 'default' to the config of an empty plugin", function() {
            const result = pluginize().run({
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