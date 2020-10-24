import { pluginize } from '../src/index.js';


import { errorMode } from '../src/helpers/throwError.js';

//errorMode('development');

describe("ClonePlugin", function() {
    it("should add context.abc", function() {
        const result = pluginize().run({
            onInit() {
                return {
                    abc: true
                }
            },
            clone: {
                abc: 'def'
            }
        });
        expect(result.def).toBeDefined();
    });

    it("should still have a defined key 'abc'", function() {
        const result = pluginize().run({
            onInit() {
                return {
                    abc: true
                }
            },
            clone: {
                abc: 'def'
            }
        });
        expect(result.abc).toBeDefined();
    });

    it("should not change clone.x when changing source.x - the key should be a copy", function() {
        const result = pluginize().run({
            onInit() {
                return {
                    source: {
                        x: 5
                    }
                }
            },
            clone: {
                source: 'clone'
            }
        });
        result.source.x = 13;

        console.log(result)

        expect(result.clone.x).toBe(5);
    });
});