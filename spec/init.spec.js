import { Pluginize, PluginizeAsync } from './generated/index.js';
import { errorMode } from './generated/throwError.js'

errorMode('development');


describe("Pluginize: ", function() {
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
            return Pluginize({ xyabc: true });
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
});

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
});