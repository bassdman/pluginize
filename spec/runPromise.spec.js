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

    it("should not throw an error for attribute init", async function() {
        await expectAsync(pluginize().runPromise({ init: function() {} })).toBeResolved();
    });
    it("should throw an error for attribute init if it is not a function", async function() {
        await expectAsync(pluginize().runPromise({ init: {} })).toBeRejected('config.init.wrongtype');
    });
    it("should add function xy to the context if it is returend in initfunction", async function() {
        const result = await pluginize().runPromise({
            init: function() {
                return {
                    abc: function() {}
                }
            }
        });
        expect(typeof result.abc).toBe('function');
    });
    it("should ignore other return types then object for init function", async function() {
        await expectAsync(pluginize().runPromise({ init: function() { return 5; } })).toBeResolved();
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
    it("should have a hook called 'initPlugin'", async function() {
        await expectAsync(pluginize().runPromise({
            hooks: {
                initPlugin: function() {}
            }
        })).toBeResolved();
    });
    it("should have a hook called 'pluginsInitialized'", async function() {
        await expectAsync(pluginize().runPromise({
            hooks: {
                pluginsInitialized: function() {}
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
    it("should not throw an error if invalid configattribute xyabc is added and config.desactivateKeyCheck == true", async function() {
        await expectAsync(pluginize().runPromise({ xyabc: true, desactivateKeyCheck: true })).toBeResolved();
    });

    it("should have a function desactivateKeyCheck in context", async function() {
        const result = await pluginize().runPromise();

        expect(result.desactivateKeyCheck).toBeDefined();
    });

    it("should not throw an error if config-attribute 'return' is set", async function() {
        await expectAsync(pluginize().runPromise({ return: 'abc' })).toBeResolved();
    });

    it("should return'hello world' if config-attribute 'return' is 'helloworld' with context.helloworld = 'hello world'", async function() {
        const result = await pluginize().runPromise({
            return: 'helloworld',
            init() {
                return {
                    helloworld: 'hello world'
                }
            }
        });
        expect(result).toBe('hello world');
    });


    describe('async config.hooks.preInitPlugin', function() {
        it("should have a hook 'preInitPlugin'", async function() {
            const result = await pluginize().runPromise();

            expect(result.hooks.preInitPlugin).toBeDefined();
        });

        it("should be called before 'initPlugin'", async function() {
            const order = [];
            await pluginize().runPromise({
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

        it("should change the config attribute _test to 'test' when it is changed", async function() {
            const result = await pluginize().runPromise({
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