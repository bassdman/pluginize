import { pluginize } from '../src/index.js';
import { errorMode } from '../src/helpers/throwError.js';

errorMode('development');

describe("pluginize(config)", function() {
    it("should be typeof function", function() {
        expect(typeof pluginize).toBe('function');
    });

    it("should have a function called runPromise when executed", function() {
        expect(pluginize().runPromise).toBeDefined();
    });

    it("should have a function called run when executed", function() {
        expect(pluginize().run).toBeDefined();
    });

    it("should return 'hello world' if pluginize(config) initializes it and run() is called without parameter", function() {
        const result = pluginize({
            return: 'helloworld',
            init() {
                return {
                    helloworld: 'hello world'
                }
            }
        }).run();

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
        ).run();
        expect(result.hw1).toBe('hello world1');
        expect(result.hw2).toBe('hello world2');
    });

    it("should throw an error if config.changeConfig returns undefined", function() {
        expect(() => {
            pluginize({}, {
                changeConfig: function(config) {

                }
            }).run();
        }).toThrow('factoryConfig.changeConfig.isNull');
    });

    it("should throw an error if config.changeConfig returns a number", function() {
        expect(() => {
            pluginize({}, {
                changeConfig: function(config) {
                    return 5;
                }
            }).run();
        }).toThrow('factoryConfig.changeConfig.wrongType');
    });

    it("should throw an error if config.changeConfig returns an Array", function() {
        expect(() => {
            pluginize({}, {
                changeConfig: function(config) {
                    return [];
                }
            }).run();
        }).toThrow('factoryConfig.changeConfig.wrongTypeArray');
    });

    it("should add config.test in the configattributes when config.changeConfig added this", function() {
        const result = pluginize({}, {
            changeConfig: function(config) {
                config.test = config._test;
                delete config._test;

                return config;
            },
        }, ).run({ _test: true, allowKeys: ['test'] });
        expect(result.config.test).toBeDefined();
    });

    it("should throw an error if a factoryConfig.plugins is a number", function() {
        expect(() => {
            const result = pluginize({}, {
                plugins: 5
            }, ).run();
        }).toThrow('factoryConfig.plugins.wrongType');
    });

    it("should throw an error if a factoryConfig.plugins is a number", function() {
        expect(() => {
            const result = pluginize({}, {
                plugins: [5]
            }, ).run();
        }).toThrow('factoryConfig.plugins.plugin.wrongType');
    });

    it("should throw an error if a factoryConfig.plugins is a number", function() {
        expect(() => {
            const result = pluginize({}, {
                plugins: [{ abc: true }]
            }, ).run();
        }).toThrow('factoryConfig.plugins.plugin.wrongkey');
    });

    it("should throw an error if a factoryConfig.plugins is a number", function() {
        expect(() => {
            pluginize({}, {
                plugins: [{ resolve: true }]
            }, ).run();
        }).toThrow('factoryConfig.plugins.plugin.wrongkeytype');
    });

    it("should call plugin.init when a plugin uses an init function", function() {
        const init = jasmine.createSpy('init');
        pluginize({}, {
            plugins: [{ init }]
        }, ).run();

        expect(init).toHaveBeenCalledTimes(1);
    });

    it("should call plugin.init when a plugin uses an init function", function() {
        const resolve = jasmine.createSpy('resolve');
        pluginize({}, {
            plugins: [{ resolve }]
        }, ).run();

        expect(resolve).toHaveBeenCalledTimes(1);
    });
});