import { pluginize } from '../src/index.js';

import { errorMode } from '../src/helpers/throwError.js';

errorMode('development');


it("should not throw an error if config-attribute 'return' is set", function() {
    expect(() => {
        return pluginize().run({ return: 'abc' });
    }).not.toThrow();
});

it("should return'hello world' if config-attribute 'return' is 'helloworld' with context.helloworld = 'hello world'", function() {
    const result = pluginize().run({
        return: 'helloworld',
        init() {
            return {
                helloworld: 'hello world'
            }
        }
    });
    expect(result).toBe('hello world');
});