import { pluginize } from '../src/index.js';

describe("examples", function() {
    it("04_hooks", function() {
        const myLibrary = pluginize({
            init(config, pluginConfig, context) {
                //1st way to add sth in the context - modify the context object
                context.sayHelloDefault = function() {
                    console.log('hello ' + config.name);
                }

                //2nd way: every attribute returned will be added to the context
                return {
                    sayHello(name) {
                        console.log('hello ' + name);
                    }
                }
            }
        });



        expect(() => {
            //now our result includes these two functions 
            myLibrary.run({ name: 'heinrich' });
        }).not.toThrow();
    })

    it("05_return", function() {
        const CalculationPlugin = {
            allowKeys: ['numbers'],
            name: 'CalculationPlugin',
            return: 'sum',
            init(config, pluginConfig) {
                console.log(config, pluginConfig)
                return {
                    sum: config.numbers.reduce((pv, cv) => pv + cv, 0)
                }
            }
        };

        const result = pluginize({
            numbers: [1, 2, 3, 4, 5, 6],
            plugins: [CalculationPlugin]
        }).run();



        expect(result).toBe(21);
    })
})