const { pluginize } = require('../add-plugins/node_modules/pluginize');

const myLibrary = pluginize();

//yippie, we have a default result from a syncronous task
const syncResult = myLibrary.run();

console.log(syncResult);


//if we want to runPromise some async tasks, we can use runPromise()
const asyncResult = myLibrary.runPromise().then(result => {
    console.log(result);
});