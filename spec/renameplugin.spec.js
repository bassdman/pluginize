import { pluginize } from '../src/index.js';


import { errorMode } from '../src/helpers/throwError.js';

errorMode('development');

describe("RenamePlugin", function() {
    it("should rename context.abc to context.def", function() {
        const result = pluginize().applySync({
            init() {
                return {
                    abc: true
                }
            },
            rename: {
                abc: 'def'
            }
        });
        expect(result.abc).toBeUndefined();
        expect(result.def).toBeDefined();
    });
});