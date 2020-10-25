import { pluginize, SyncHook } from '../src/index.js';
import { errorMode } from '../src/helpers/throwError.js'

errorMode('development');


describe("pluginize.runPromise(config):", function() {
    it("should return an object if called without parameter", async function() {
        const result = await pluginize().runPromise();
        expect(typeof result).toBe('object');
    });

    it("should return an object if called with an object", async function() {
        const result = await pluginize().runPromise({});
        expect(typeof result).toBe('object');
    });

    it("should throw an error if invalid configattribute xyabc is added", async function() {
        await expectAsync(pluginize().runPromise({ xyabc: true })).toBeRejected('config.invalidKey');
    });

    it("should not throw an error for attribute plugins as an array", async function() {
        await expectAsync(pluginize().runPromise({ plugins: [] })).toBeResolved();
    });
    it("should throw an error for attribute plugins if it is not an array", async function() {
        await expectAsync(pluginize().runPromise({ plugins: {} })).toBeRejected('config.plugin.wrongtype');
    });

    it("should not throw an error for attribute onInit", async function() {
        await expectAsync(pluginize().runPromise({ onInit: function() {} })).toBeResolved();
    });
    it("should throw an error for attribute onInit if it is not a function", async function() {
        await expectAsync(pluginize().runPromise({ onInit: {} })).toBeRejected('config.onInit.wrongtype');
    });
    it("should add function xy to the context if it is returend in initfunction", async function() {
        const result = await pluginize().runPromise({
            onInit: function() {
                return {
                    abc: function() {}
                }
            }
        });
        expect(typeof result.abc).toBe('function');
    });
    it("should ignore other return types then object for onInit function", async function() {
        await expectAsync(pluginize().runPromise({ onInit: function() { return 5; } })).toBeResolved();
    });





    it("should be valid to add a config attribute called 'hooks' = {}", async function() {
        await expectAsync(pluginize().runPromise({ hooks: {} })).toBeResolved();
    });
    it("should throw an error if config attribute 'hooks' is not an object", async function() {
        await expectAsync(pluginize().runPromise({ hooks: [] })).toBeRejected('config.hooks.wrongtype');
    });
    it("should throw an error if hooks named 'xyz' does not exist", async function() {
        await expectAsync(pluginize().runPromise({
            hooks: {
                xyz: true
            }
        })).toBeRejected('config.hooks.notDefined');
    });
    it("should have a hook called 'onInitPlugin'", async function() {
        await expectAsync(pluginize().runPromise({
            onInitPlugin: function() {}
        })).toBeResolved();
    });
    it("should have a hook called 'onPluginsInitialized'", async function() {
        await expectAsync(pluginize().runPromise({
            hooks: {
                onPluginsInitialized: function() {}
            }
        })).toBeResolved();
    });
    it("should be valid to add a config attribute called 'addHooks' = {}", async function() {
        await expectAsync(pluginize().runPromise({ addHooks: {} })).toBeResolved();
    });
    it("should throw an error if config attribute 'addHooks' is not an object", async function() {
        await expectAsync(pluginize().runPromise({ addHooks: [] }))
            .toBeRejected('config.addHooks.wrongtype');
    });
    it("should not throw an error with addHook:{xyz} and hook:{xyz}", async function() {
        await expectAsync(pluginize().runPromise({
            debug: true,
            addHooks: {
                xyz: new SyncHook()
            },
            hooks: {
                xyz: function() {}
            }
        })).toBeResolved();
    });
    it("should not throw an error if invalid configattribute xyabc is added and config.disableKeyCheck == true", async function() {
        await expectAsync(pluginize().runPromise({ xyabc: true, disableKeyCheck: true })).toBeResolved();
    });

    it("should have a function disableKeyCheck in context", async function() {
        const result = await pluginize().runPromise();

        expect(result.disableKeyCheck).toBeDefined();
    });

    it("should not throw an error if config-attribute 'return' is set", async function() {
        await expectAsync(pluginize().runPromise({ return: 'abc' })).toBeResolved();
    });

    it("should return'hello world' if config-attribute 'return' is 'helloworld' with context.helloworld = 'hello world'", async function() {
        const result = await pluginize().runPromise({
            return: 'helloworld',
            onInit() {
                return {
                    helloworld: 'hello world'
                }
            }
        });
        expect(result).toBe('hello world');
    });


    describe('async config.hooks.onPreInitPlugin', function() {
        it("should have a hook 'onPreInitPlugin'", async function() {
            const result = await pluginize().runPromise();

            expect(result.hooks.onPreInitPlugin).toBeDefined();
        });

        it("should be called before 'onInitPlugin'", async function() {
            const order = [];
            await pluginize().runPromise({
                onInitPlugin() {
                    if (!order.includes('onInitPlugin'))
                        order.push('onInitPlugin');
                },
                hooks: {
                    onPreInitPlugin() {
                        if (!order.includes('onPreInitPlugin'))
                            order.push('onPreInitPlugin');
                    },

                }
            });

            expect(order).toEqual(['onPreInitPlugin', 'onInitPlugin']);
        });

        it("should change the config attribute _test to 'test' when it is changed", async function() {
            const result = await pluginize().runPromise({
                _test: true,
                hooks: {
                    onPreInitPlugin(config) {
                        config.test = config._test;
                        delete config._test;
                    },
                },
                allowKeys: ['test']
            });

            expect(result.config.test).toEqual(true);
            expect(result.config._test).toBeUndefined();
        });

        it("should throw an error for an empty plugin without a name", async function() {
            await expectAsync(pluginize().runPromise({
                plugins: [{

                }],
            })).toBeRejected('plugin.noName');
        });

        it("should add name = 'default' to the config of an empty plugin", async function() {
            const result = await pluginize().runPromise({
                plugins: [{

                }],
                hooks: {
                    onPreInitPlugin(config) {
                        if (!config.name)
                            config.name = 'default';
                    },
                },
            });

            expect(result.config.plugins[0].name).toEqual('default');
        });
    });
});