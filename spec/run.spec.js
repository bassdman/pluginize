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
    it("should have a hook called 'onInitPlugin'", function() {
        expect(() => {
            return pluginize().run({
                onInitPlugin: function() {}
            });
        }).not.toThrow();
    });
    it("should have a hook called 'onPluginsInitialized'", function() {
        expect(() => {
            return pluginize().run({
                onPluginsInitialized: function() {}
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

    describe('config.onPreInitPlugin', function() {
        it("should have a hook 'onPreInitPlugin'", function() {
            const result = pluginize().run();

            expect(result.onPreInitPlugin).toBeDefined();
        });

        it("should be called before 'onInitPlugin'", function() {
            const order = [];
            pluginize().run({
                onInitPlugin() {
                    if (!order.includes('onInitPlugin'))
                        order.push('onInitPlugin');
                },
                onPreInitPlugin() {
                    if (!order.includes('onPreInitPlugin'))
                        order.push('onPreInitPlugin');
                },
            });

            expect(order).toEqual(['onPreInitPlugin', 'onInitPlugin']);
        });

        it("should change the config attribute _test to 'test' when it is changed", function() {
            const result = pluginize().run({
                _test: true,
                onPreInitPlugin(config) {
                    config.test = config._test;
                    delete config._test;
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
                onPreInitPlugin(config) {
                    if (!config.name)
                        config.name = 'default';
                },
            });

            expect(result.config.plugins[0].name).toEqual('default');
        });
    });
});