import { Instance } from '../src/index.js';

describe("Pluginize Instance", function() {
    it("should be typeof function", function() {
        expect(typeof Instance).toBe('function');
    });

    it("should return a Pluginize Object when called", function() {
        const pluginize = Instance();
        expect(pluginize._pluginize).toBeDefined();
    });

    it("should return 'hello world' if Instance initializes it and pluginize() is called without parameter", function() {
        const Pluginize = Instance({
            return: 'helloworld',
            init() {
                return {
                    helloworld: 'hello world'
                }
            }
        });
        const result = Pluginize();
        expect(result).toBe('hello world');
    });

    it("should return 'hello world' in key 'hw1' and 'hw2' when Instance is called with array of configs", function() {
        const Pluginize = Instance([{
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
        }]);
        const result = Pluginize();
        expect(result.hw1).toBe('hello world1');
        expect(result.hw2).toBe('hello world2');
    });
});