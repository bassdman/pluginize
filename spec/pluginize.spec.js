import { pluginize } from '../src/index.js';
import { errorMode } from '../src/helpers/throwError.js';

errorMode('development');

describe("pluginize(config)", function() {
    it("should be typeof function", function() {
        expect(typeof pluginize).toBe('function');
    });

    it("should have a function called apply when executed", function() {
        expect(pluginize().apply).toBeDefined();
    });

    it("should have a function called applySync when executed", function() {
        expect(pluginize().applySync).toBeDefined();
    });

    it("should return 'hello world' if pluginize(config) initializes it and applySync() is called without parameter", function() {
        const result = pluginize({
            return: 'helloworld',
            init() {
                return {
                    helloworld: 'hello world'
                }
            }
        }).applySync();

        expect(result).toBe('hello world');
    });

    it("should return 'hello world' in key 'hw1' and 'hw2' when pluginize() is called with array of configs", function() {
        const result = pluginize(
            [{
                init() {
                    return {
                        hw1: 'hello world1'
                    }
                }
            }, {
                init() {
                    return {
                        hw2: 'hello world2'
                    }
                }
            }]
        ).applySync();
        expect(result.hw1).toBe('hello world1');
        expect(result.hw2).toBe('hello world2');
    });

    it("should throw an error if config.changeConfig returns undefined", function() {
        expect(() => {
            pluginize({}, {
                changeConfig: function(config) {

                }
            }).applySync();
        }).toThrow('factoryConfig.changeConfig.isNull');
    });

    it("should throw an error if config.changeConfig returns a number", function() {
        expect(() => {
            pluginize({}, {
                changeConfig: function(config) {
                    return 5;
                }
            }).applySync();
        }).toThrow('factoryConfig.changeConfig.wrongType');
    });

    it("should throw an error if config.changeConfig returns an Array", function() {
        expect(() => {
            pluginize({}, {
                changeConfig: function(config) {
                    return [];
                }
            }).applySync();
        }).toThrow('factoryConfig.changeConfig.wrongTypeArray');
    });

    it("should add config.test in the configattributes when config.changeConfig added this", function() {
        const result = pluginize({}, {
            changeConfig: function(config) {
                config.test = config._test;
                delete config._test;

                return config;
            },
        }, ).applySync({ _test: true, allowKeys: ['test'] });
        expect(result.config.test).toBeDefined();
    });

    it("should throw an error if a factoryConfig.plugins is a number", function() {
        expect(() => {
            const result = pluginize({}, {
                plugins: 5
            }, ).applySync();
        }).toThrow('factoryConfig.plugins.wrongType');
    });

    it("should throw an error if a factoryConfig.plugins is a number", function() {
        expect(() => {
            const result = pluginize({}, {
                plugins: [5]
            }, ).applySync();
        }).toThrow('factoryConfig.plugins.plugin.wrongType');
    });

    it("should throw an error if a factoryConfig.plugins is a number", function() {
        expect(() => {
            const result = pluginize({}, {
                plugins: [{ abc: true }]
            }, ).applySync();
        }).toThrow('factoryConfig.plugins.plugin.wrongkey');
    });

    it("should throw an error if a factoryConfig.plugins is a number", function() {
        expect(() => {
            pluginize({}, {
                plugins: [{ resolve: true }]
            }, ).applySync();
        }).toThrow('factoryConfig.plugins.plugin.wrongkeytype');
    });

    it("should call plugin.init when a plugin uses an init function", function() {
        const init = jasmine.createSpy('init');
        pluginize({}, {
            plugins: [{ init }]
        }, ).applySync();

        expect(init).toHaveBeenCalledTimes(1);
    });

    it("should call plugin.init when a plugin uses an init function", function() {
        const resolve = jasmine.createSpy('resolve');
        pluginize({}, {
            plugins: [{ resolve }]
        }, ).applySync();

        expect(resolve).toHaveBeenCalledTimes(1);
    });
});