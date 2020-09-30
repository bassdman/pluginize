import { Pluginize } from '../src/index.js';
import { errorMode } from '../src/helpers/throwError.js';
import { SyncHook } from '../src/helpers/hooks.js';

errorMode('development');


describe("Pluginize", function() {
    it("should be typeof function", function() {
        expect(typeof Pluginize).toBe('function')
    });

    it("should return an object if called without parameter", async function() {
        const result = Pluginize();
        expect(typeof result).toBe('object');
    });

    it("should return an object if called with an object", async function() {
        const result = Pluginize({});
        expect(typeof result).toBe('object');
    });

    it("should throw an error if invalid configattribute xyabc is added", async function() {
        expect(() => {
            Pluginize({ xyabc: true });
        }).toThrow('config.invalidKey');
    });

    it("should not throw an error for attribute plugins as an array", async function() {
        expect(() => {
            return Pluginize({ plugins: [] });
        }).not.toThrow();
    });
    it("should throw an error for attribute plugins if it is not an array", async function() {
        expect(() => {
            return Pluginize({ plugins: {} });
        }).toThrow('config.plugin.wrongtype');
    });
    it("should not throw an error for attribute init", async function() {
        expect(() => {
            return Pluginize({ init: function() {} });
        }).not.toThrow();
    });
    it("should throw an error for attribute init if it is not a function", async function() {
        expect(() => {
            return Pluginize({ init: {} });
        }).toThrow('config.init.wrongtype');
    });
    it("should add function xy to the context if it is returend in initfunction", async function() {
        const result = Pluginize({
            init: function() {
                return {
                    abc: function() {}
                }
            }
        });
        expect(typeof result.abc).toBe('function');
    });
    it("should ignore other return types then object for init function", async function() {

        expect(() => {
            Pluginize({
                init: function() {
                    return 5;
                }
            });
        }).not.toThrow();
    });


    //noch nicht in async
    it("should be valid to add a config attribute called 'hooks' = {}", async function() {
        expect(() => {
            return Pluginize({ hooks: {} });
        }).not.toThrow();
    });
    it("should throw an error if config attribute 'hooks' is not an object", async function() {
        expect(() => {
            return Pluginize({ hooks: [] });
        }).toThrow('config.hooks.wrongtype');
    });
    it("should throw an error if hooks named 'xyz' does not exist", async function() {
        expect(() => {
            return Pluginize({
                hooks: {
                    xyz: true
                }
            });
        }).toThrow('config.hooks.notDefined');
    });
    it("should have a hook called 'initPlugin'", async function() {
        expect(() => {
            return Pluginize({
                hooks: {
                    initPlugin: function() {}
                }
            });
        }).not.toThrow();
    });
    it("should have a hook called 'pluginsInitialized'", async function() {
        expect(() => {
            return Pluginize({
                hooks: {
                    pluginsInitialized: function() {}
                }
            });
        }).not.toThrow();
    });
    it("should be valid to add a config attribute called 'addHooks' = {}", async function() {
        expect(() => {
            return Pluginize({ addHooks: {} });
        }).not.toThrow();
    });
    it("should throw an error if config attribute 'addHooks' is not an object", async function() {
        expect(() => {
            return Pluginize({ addHooks: [] });
        }).toThrow('config.addHooks.wrongtype');
    });
    it("should not throw an error with addHook:{xyz} and hook:{xyz}", async function() {
        expect(() => {
            return Pluginize({
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
    it("should not throw an error if invalid configattribute xyabc is added and config.desactivateKeyCheck == true", async function() {
        expect(() => {
            return Pluginize({ xyabc: true, desactivateKeyCheck: true });
        }).not.toThrow();
    });

    it("should not throw an error if config-attribute 'return' is set", async function() {
        expect(() => {
            return Pluginize({ return: 'abc' });
        }).not.toThrow();
    });

    it("should return'hello world' if config-attribute 'return' is 'helloworld' with context.helloworld = 'hello world'", async function() {
        const result = Pluginize({
            return: 'helloworld',
            init() {
                return {
                    helloworld: 'hello world'
                }
            }
        });
        expect(result).toBe('hello world');
    });
});