import { pluginize } from '../src/index.js';
import { errorMode } from '../src/helpers/throwError.js';

errorMode('development');

describe("DeletePlugin", function() {
    it("should delete context.abc", function() {
        const result = pluginize().run({
            onInit() {
                return {
                    abc: true
                }
            },
            delete: ['abc']
        });
        expect(result.abc).toBeUndefined();
    });
});