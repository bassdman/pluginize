const { pluginize } = require('pluginize');

const myLibrary = pluginize();

//yippie, we have a default result from a syncronous task
const syncResult = myLibrary.applySync();

console.log(syncResult);


//if we want to apply some async tasks, we can use apply()
const asyncResult = myLibrary.apply().then(result => {
    console.log(result);
});