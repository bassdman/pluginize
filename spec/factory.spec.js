import { Factory } from '../src/index.js';

describe("Pluginize Factory", function() {
    it("should be typeof function", function() {
        expect(typeof Factory).toBe('function');
    });

    it("should return a Pluginize Object when called", function() {
        const pluginize = Factory();
        expect(pluginize._pluginize).toBeDefined();
    });

    it("should return 'hello world' if factory initializes it and pluginize() is called without parameter", function() {
        const Pluginize = Factory({
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
});