import { PluginizeAsync } from '../src/index.js';
import { errorMode } from '../src/helpers/throwError.js'

errorMode('development');


describe("PluginizeAsync: ", function() {
    it("should be typeof function", function() {
        expect(typeof PluginizeAsync).toBe('function')
    });

    it("should return an object if called without parameter", async function() {
        const result = await PluginizeAsync();
        expect(typeof result).toBe('object');
    });

    it("should return an object if called with an object", async function() {
        const result = await PluginizeAsync({});
        expect(typeof result).toBe('object');
    });

    it("should throw an error if invalid configattribute xyabc is added", async function() {
        await expectAsync(PluginizeAsync({ xyabc: true })).toBeRejected('config.invalidKey');
    });

    it("should not throw an error for attribute plugins as an array", async function() {
        await expectAsync(PluginizeAsync({ plugins: [] })).toBeResolved();
    });
    it("should throw an error for attribute plugins if it is not an array", async function() {
        await expectAsync(PluginizeAsync({ plugins: {} })).toBeRejected('config.plugin.wrongtype');
    });

    it("should not throw an error for attribute init", async function() {
        await expectAsync(PluginizeAsync({ init: function() {} })).toBeResolved();
    });
    it("should throw an error for attribute init if it is not a function", async function() {
        await expectAsync(PluginizeAsync({ init: {} })).toBeRejected('config.init.wrongtype');
    });
    it("should add function xy to the context if it is returend in initfunction", async function() {
        const result = await PluginizeAsync({
            init: function() {
                return {
                    abc: function() {}
                }
            }
        });
        expect(typeof result.abc).toBe('function');
    });
    it("should ignore other return types then object for init function", async function() {
        await expectAsync(PluginizeAsync({ init: function() { return 5; } })).toBeResolved();
    });
});