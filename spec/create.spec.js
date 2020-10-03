import { Pluginize } from '../src/index.js';
import { errorMode } from '../src/helpers/throwError.js';

errorMode('development');

describe("Pluginize.create", function() {
    it("should be typeof function", function() {
        expect(typeof Pluginize.create).toBe('function');
    });

    it("should return a Pluginize Object when called", function() {
        const pluginize = Pluginize.create();
        expect(pluginize._pluginize).toBeDefined();
    });

    it("should return 'hello world' if Pluginize.create initializes it and pluginize() is called without parameter", function() {
        const pluginize = Pluginize.create({
            apply: {
                return: 'helloworld',
                init() {
                    return {
                        helloworld: 'hello world'
                    }
                }
            }
        });
        const result = pluginize();
        expect(result).toBe('hello world');
    });

    it("should return 'hello world' in key 'hw1' and 'hw2' when create is called with array of configs", function() {
        const pluginize = Pluginize.create({
            apply: [{
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
        });
        const result = pluginize();
        expect(result.hw1).toBe('hello world1');
        expect(result.hw2).toBe('hello world2');
    });

    it("should throw an error if config.changeConfig returns undefined", function() {

        expect(() => {
            const pluginize = Pluginize.create({
                changeConfig: function(config, ctx) {

                }
            });
            pluginize();
        }).toThrow('config.changeConfig.returnNull');
    });

    it("should add config.test in the configattributes when config.changeConfig added this", function() {
        const pluginize = Pluginize.create({
            changeConfig: function(config, ctx) {
                config.test = config._test;
                delete config._test;


                return config;
            },
            apply: {
                allowKeys: ['test']
            }
        }, );
        const result = pluginize({ _test: true });
        expect(result.config.test).toBeDefined();
    });
});