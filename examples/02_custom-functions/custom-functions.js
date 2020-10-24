const { pluginize } = require('pluginize');

const myLibrary = pluginize({
    onInit(config, pluginConfig, context) {
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

//now our result includes these two functions
const result = myLibrary.run({ name: 'heinrich' });
result.sayHelloDefault(); // hello heinrich
result.sayHello('Peter'); // hello peter