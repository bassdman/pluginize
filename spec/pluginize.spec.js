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

    it("should add config.test in the configattributes when config.preInit added this", function() {
        const result = pluginize({
            preInit: function(config) {
                config.test = config._test;
                delete config._test;

                return config;
            },
        }, ).run({ _test: true, allowKeys: ['test'] });
        expect(result.config.test).toBeDefined();
    });

    it("should return a function", function() {
        const result = pluginize();

        expect(typeof result).toBe('function');
    });

    it("should have 1 plugin internally for each of two called pluginze-functions", function() {
        const lib1 = pluginize({ init() {} });
        const lib2 = pluginize();

        expect(lib1.factoryConfig.configs.length).toBe(1);
        expect(lib2.factoryConfig.configs.length).toBe(1);
    });

    it("should have 2 plugins internally when it is created after another one", function() {
        const lib1 = pluginize()();
        const lib2 = pluginize()()();

        expect(lib1.factoryConfig.configs.length).toBe(2);
        expect(lib2.factoryConfig.configs.length).toBe(3);
    });

    it("should have 2 plugins internally when it is created after another one", function() {
        const libRoot = pluginize({ name: 'pluginize' });
        const lib1 = libRoot({ name: 'l1' })({ name: 'l11' });
        const lib2 = libRoot({ name: 'l2' })({ name: 'l21' })({ name: 'l22' });

        expect(lib1.factoryConfig.configs.length).toBe(3);
        expect(lib2.factoryConfig.configs.length).toBe(4);
    });
});