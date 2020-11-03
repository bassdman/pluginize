# pluginize
> The infrastructure package for creating your library / project.

[![npm version](https://img.shields.io/npm/v/pluginize.svg)](https://www.npmjs.com/package/pluginize)
[![npm downloads](https://img.shields.io/npm/dt/pluginize.svg)](https://www.npmjs.com/package/pluginize)
[![npm downloads](https://img.shields.io/github/license/mashape/apistatus.svg)](https://www.npmjs.com/package/pluginize)

Quick Links
   - [The why](#the-why)
   - [Step by step - Tutorial](#step-by-step)
   - [API](#api)
 
## Install

``` shell
    npm install pluginize --save
```

## The Why
Just write this line of code 
``` javascript
const yourLibrary = pluginize(yourconfig);
```
and you will have
- the ability to add Plugins
``` javascript
yourLibrary.run({
    plugins:[pluginA, pluginB,..]
})
```
- the ability to add Plugins that can be built of other plugins
``` javascript
const plugin = {
    // add pluginconfiguration here
    plugins: [nestedPlugin1,nestedPlugin2];
}
yourLibrary.run({
    plugins:[plugin]
});
```
- add custom properties / methods to your library
``` javascript
const yourLibrary = pluginize({
    onInit(config,pluginConfig){
        return{
            hello(name){
                console.log('hello' + name || pluginConfig.defaultName);
            }
        }
    }
})
```

- run your library asynchronous
``` javascript
const yourLibrary = pluginize({
    //some config
});
const result = await yourLibrary.runPromise();
```

- the chance to hook in every process of your library (and of course of the plugins, too)
``` javascript
yourLibrary.runPromise({
    onInitPlugin(config){
        //do sth when your library / the plugins are initialized
    },
    onPluginsInitialized(){
        // do sth when all plugins are initialized
    }
    onInit(){
        // do sth on init
    }
    ...
});
```

- choose what your plugin returns
``` javascript
//default: a library returns an object (the context) - but you can modify it
const yourlibrary = pluginize({
    rename: {
        // renames the keys of the output
    }
    delete: {
        // removes the keys of the output
    },
    return: 'akey', //if you want a specific key to be returned
    onReturn(context){
        //when you want sth completely different, for example a function, you can do it here :)
    }
});

//now returns whatever you want instead of the default output
const output yourLibrary.run(config);
```
- add your hooks that can be used
``` javascript
//default: a library returns an object (the context) - but you can modify it
const yourlibrary = pluginize({
    onInit(){
        setTimeout(function(config,ctx){
            ctx.after5Seconds.call('5 seconds later');
        }, 5000);

        return {
            after5Seconds: pluginize.SyncHook() // don't worry about the hooks - your will learn more about them later
        }
    }
});

//it can be used like this
yourLibrary.runPromise({
    after5Seconds(message){
        //do sth after 5 seconds
    }
})

//now returns whatever you want instead of the default output
const output = yourLibrary.runPromise(config);
```
...

##Step by step

Let's create a library together, step by step. So you will learn all features of pluginize.

# Preparation
[View some examples](https://github.com/bassdman/pluginize/tree/master/examples/01_basic)

Get the package
``` shell
    npm install pluginize --save
```
and import it into your project
``` javascript
import {pluginize} form 'pluginize';
```
or as a script
``` html
<!-- you can find the files in dist/pluginize.min.js" in this repository>-->
<script src="path/to/pluginize.min.js"></script>
```
As a first step we create our first library that does (almost) nothing.
``` javascript
const myLibrary = pluginize();

//yippie, we have a default result from a syncronous task
const syncResult = myLibrary.run();

//if we want to run some async tasks, we can use runPromise()
const asyncResult = await myLibrary.runPromise();
```

Both results will look similar to this
``` javascript
{
    plugins: [ /*some internal plugins*/  ],
    config: { name: 'Pluginize' },
    _context: true,
    addPlugin: [Function],
    onReturn: SyncHook {  },
    onPreInitPlugin: SyncWaterfallHook {},
    onPluginsInitialized: SyncHook {  },
    onInitPlugin: SyncHook { }
    log: [Function], //you can log sth with result.log(xxx)
    disableKeyCheck: [Function], 
    on: [Function] // you can listen to hooks with result.on()
}
```
Yippie we have built our first library. But it does not do what we want. Let's change it.

## Add custom functions
[View an example](https://github.com/bassdman/pluginize/tree/master/examples/02_custom-functions)

Of course your library will need some functions that the users can use. Let's add some. We will create a small Mathlibrary with useful helperfunctions.

``` javascript
const myLibrary = pluginize({
    name: "MathLibrary",
    onInit(config, pluginConfig, context) {
        //1st way to add sth in the context - modify the context object
        context.add = function(a,b) {
            return a + b;
        }

        context.pluginname = config.name;

        //2nd way: every attribute returned will be added to the context
        return {
            multiply(a,b) {
                return a * b;
            }
        }
    }
});

//now our result includes these two functions
const result = myLibrary.run({name: 'MathLibrary'});
result.add(1,2); // = 3
result.multiply(1,2); // = 2
result.pluginname; // = MathLibrary
```

## Add Plugins
[View an example](https://github.com/bassdman/pluginize/tree/master/examples/03_add-plugins)

This is such a great feature - others should also be able to use it. Let's outsource it as a plugin.

``` javascript
//math.plugin.js
module.exports = {
    // Every plugin needs a name - so let's name it 'MathLibraryPlugin'
    name: 'MathLibraryPlugin',
    onInit(config, pluginConfig,context) {
        context.add = function(a,b) {
            return a + b;
        }

        context.pluginname = config.name;

        return {
            multiply(a,b) {
                return a * b;
            }
        }
    }
}
```
```javascript
// index.js
const MathLibraryPlugin = require('./math.plugin');
const { pluginize } = require('pluginize');

const myLibrary = pluginize({
    plugins: [MathLibraryPlugin]
});

const result = myLibrary.run();
result.add(1,2); // = 3
result.multiply(1,2); // = 2
result.pluginname; // = MathLibrary
```

Hint: it is recommended to write Plugins as a function that returns a config - so users can customize your plugin
``` javascript
//sayhello.plugin.js
module.exports = function(customConfig={}){
    return {
        name: 'MathLibraryPlugin-Customconfig',
        onInit(config, pluginConfig,context) {
            // for a better readability we initialized all in the return value. But it is still valid like written above. 
            return {
                pluginname: customConfig.namePrefix + config.name,
                add(a,b){
                    return a + b;
                },
                multiply(a,b) {
                    return a * b;
                }
            }
        }
    }
}
```
```javascript
// index.js
const MathLibraryPlugin = require('./math.plugin');
const { pluginize } = require('pluginize');

const myLibrary = pluginize({
    //now you call the plugin as a function
    plugins: [ MathLibraryPlugin({namePrefix:'the real '}) ]
});

const result = myLibrary.run();
result.add(1,2); // = 3
result.multiply(1,2); // = 2
result.pluginname; // = the real MathLibrary
```

## Custom Keys

[View an example](https://github.com/bassdman/pluginize/tree/master/examples/04_custom-keys)

Now we want to add some customized beavior. 
Let's add custom data to the context, that the user can add via config.

Example: A user can add custom data via attribute "custom".
```javascript
// this is the plugin - it adds the key "custom" to the context. 
const customKeyPlugin = {
    name: "CustomKeyPlugin",
    onInit(config) {
        return {
            custom: config.custom
        }
    },
};

// the user adds a custom function to the custom context
const myLibrary = pluginize({
    custom: function(){/*a user defined function*/},
    plugins: [customKeyPlugin]
})
const result = myLibrary.run();
/*
    result should be: {
        ...
            custom: function(){/*the user defined function*/},
        ...
    }
*/
```
But wait... there is an error: 
```
Config attribute "custom" is used but not allowed. Allowed are ...
```
By Default just a few keys are allowed via for the config - we must whitelist new ones.

### Recommended way
Let's allow the attribute 'custom';
```javascript
const customKeyPlugin = {
    allowKeys: ['custom'],
    name: "CustomKeyPlugin",
    onInit(config) {
        return {
            custom: config.custom
        }
    },
};
```

Now the plugin works as expected.

:warning: Prooving Nested keys is not (yet) supported. 
```javascript
// this does not work you have to validate these keys by yourself
{ 
    allowKeys['custom.a','custom.b']
}
```

### Additional way
(not recommended, but possible)
disableKeycheck. If you're bored of adding keys again and again, you can disable this check. Then the user can add anything to the config without any error that is thrown.
```javascript
const customKeyPlugin = {
    //disables the keycheck for ALL keys.
    disableKeyCheck: true,
    name: "CustomKeyPlugin",
    onInit(config) {
        return {
            custom: config.custom
        }
    },
};
```

## Change Return value
[View an example](https://github.com/bassdman/pluginize/tree/master/examples/05_return-values)

Right now pluginize().run() returns the whole context. You probably won't need the whole context but just a part of it.
There are a few ways of changing the content: 

Therefore we will use an advanced version of the MathLibraryPlugin - the CalculationPlugin. It sums up the numbers entered on config-attribute "numbers" and writes it into the context-attribute "sum".
```javascript
const CalculationPlugin = {
    allowKeys: ['numbers'],
    name: 'CalculationPlugin',
    onInit(config) {
        return {
            //this will sum up numbers. example: [1,2,3,4] => 10
            sum: config.numbers.reduce((pv, cv) => pv + cv, 0)
        }
    }
};
```

### Default return value
When we just use this plugin, pluginize().run() will return the whole context
```javascript
const myLibrary = pluginize({
    numbers: [1,2,3,4,5,6],
    plugins: [CalculationPlugin]
})
const result = myLibrary.run();
/*
    result: {
        // the whole context
        ...
            sum: 21,
        ...
    }
*/
```

### Return Key
Now we want to return a specific key of the context, not the whole context anymore - in this case the key "sum".
```javascript
const myLibrary = pluginize({
    return: 'sum',
    numbers: [1,2,3,4,5,6],
    plugins: [CalculationPlugin]
})
const result = myLibrary.run();
/*
    result is: 21
*/
```

### Rename Key
Maybe we want the whole context - but the key "sum" should have another name: "newSum":
```javascript
const myLibrary = pluginize({
    rename: {
        sum: 'newSum'
    },
    numbers: [1,2,3,4,5,6],
    plugins: [CalculationPlugin]
})
const result = myLibrary.run();
/*
    result: {
        // the whole context
        ...
            newSum: 21,
        ...
    }
*/
```

### Clone Key
Sometimes it is good to have a copy of a key (to modify the 2nd one just a little bit) - therefore you can use the key "clone".
```javascript
const myLibrary = pluginize({
    clone: {
        sum: 'newSum'
    },
    numbers: [1,2,3,4,5,6],
    plugins: [CalculationPlugin]
})
const result = myLibrary.run();
/*
    result: {
        // the whole context
        ...
            sum: 21,
            newSum: 21,
        ...
    }
*/
```

### Delete Key
To delete a key from the context. 
```javascript
const myLibrary = pluginize({
    delete:  ['sum'],
    numbers: [1,2,3,4,5,6],
    plugins: [CalculationPlugin]
})
const result = myLibrary.run();
/*
    result: {
        // the whole context
        ...
            // just the default keys,
            // sum does not exist in the context anymore
        ...
    }
*/
```
## Use hooks
Hooks help us to add code in a specific situation.
By convention all hooks should start with "on" - except there is a good reason to do it different.

We already got in contact with hooks, do you remember?

```javascript
const CalculationPlugin = {
    allowKeys: ['numbers'],
    name: 'CalculationPlugin',
    // this is one hook
    onInit(config) {}
};
```
There are some more Hooks already defined by pluginize - but you can also add some. These hooks already exist by default:
| Hook | Called | When to use | 
| ---  |  ---   |   ---       |
| onPreInit | before config is analyzed| When your inputconfig does not match the criteria, you can modify it here
| onInit  |  onInit, after onPreInit   |   To setup hooks, Context,...       |
|onPreInitPlugin| before a plugin is executed | When your pluginconfig does not match the criteria, you can modify it here|
|onInitPlugin|when a plugin is executed | If you have logic depending on the configuration of the plugins, add it here
|onPluginsInitialized|When all plugins are executed| do something after all Plugins finished |
|onReturn|before returning the result|to modify the returned result|

[Details about the hooks you can read here.](#plugin-livecycle)

Let's use this knowledge to create a small Feature-Toggle-Library.
[View an example](https://github.com/bassdman/pluginize/tree/master/examples/06_hooks)

What it should be able to do:
```javascript
const result = featureToggleLib.run({
    featurea: true,
    featureb: false,
    featurec: true
    ...
});
result.isActive('featurea'); //true
```

First, let's create a FeatureTogglePlugin
```javascript
const FeatureTogglePlugin = {
    name: "FeatureTogglePlugin",
    /*
        Here we map the config{
            featurea: true,
            featureb: false,
            featurec: true
        }
        to {
            data: {
                featurea: true,
                featureb: false,
                featurec: true
            }
        } 
    */
    onPreInit(config) {
        return {
            data: config
        }
    },
    
    // Here we define the library that will be returned
    onInit(config) {
        return {
            featureToggle: {
                data: config.data,
                isActive: function(key) { return config.data[key] }
            }
        }
    },
    // Returns key featureToggle - we define it in onInit()
    return: 'featureToggle',
    // we must allow key "data" because we use it in hook onPreInit()
    allowKeys: ['data'],
};
```

Now we will use this plugin 
```javascript
const featureToggle = pluginize({
    name: 'FeatureToggle',
    debug: true,

    plugins: [FeatureTogglePlugin]
});
```

And voilà, now we have a small featureToggle-Library.

```javascript
/**
 * Will return an object {
 *  data: {
 *      featurea: true,
 *      featureb: false,
 *      featurec: true
 *  },
 *  isActive: function(){logic inside}
 * }
 */
const result = featureToggle({
    featurea: true,
    featureb: false,
    featurec: true
}).run();
```

## Create your own hooks
When your Library becomes more complex, you may need your own hooks. 
Luckily it is very easy to create new Hooks. 

# Plugin Livecycle