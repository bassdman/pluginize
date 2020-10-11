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
    yourLibrary.apply({
        plugins:[pluginA, pluginB,..]
    })
```
- the ability to add Plugins that can be built of other plugins
``` javascript
    const plugin = {
        // add pluginconfiguration here
        plugins: [nestedPlugin1,nestedPlugin2];
    }
    yourLibrary.apply({
        plugins:[plugin]
    });
```
- add custom properties / methods to your library
``` javascript
    const yourLibrary = pluginize({
        init(config){
            return{
                hello(name){
                    console.log('hello' + name || config.defaultName);
                }
            }
        }
    })
```

- the chance to hook in every process of your library (and of course of the plugins, too)
``` javascript
    yourLibrary.apply({
        hooks: {
            initPlugin(config){
                //do sth when your library / the plugins are initialized
            },
            pluginsInitialized(){
                // do sth when all plugins are initialized
            }
        },
        init(){

        }
    });
```
- choose how your library will be used
``` javascript
    //instead of an object with an apply-function it could also be a function
    yourLibrary(/*here comes the config*/);
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
        hooks:{
            return(context){
                //when you want sth completely different, for example a function, you can do it here :)
            }
        }
    });

    //now returns whatever you want instead of the default output
    const output yourLibrary.apply(config);
```
- add your hooks that can be used
``` javascript
    //default: a library returns an object (the context) - but you can modify it
    const yourlibrary = pluginize({
        addHooks: {
            after5Seconds: new SyncHook() // don't worry about the hooks - your will learn more about them later
        },
        init(){
            setTimeout(function(config,ctx){
                ctx.hooks.after5Seconds.call('5 seconds later');
            }, 5000)
        }
    });

    //it can be used like this
    yourLibrary.apply({
        hooks: {
            after5Seconds(message){
                //do sth after 5 seconds
            }
        }
    })

    //now returns whatever you want instead of the default output
    const output = yourLibrary.apply(config);
```
...

##Step by step

Let's create a library together, step by step. So you will learn all features of pluginize.

# Preparation
[View the examples](https://github.com/bassdman/pluginize/tree/master/examples/basic)

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
now we create our first library that does (almost) nothing.
``` javascript
    const myLibrary = pluginize();

    //yippie, we have a default result from a syncronous task
    const syncResult = myLibrary.applySync();

    //if we want to apply some async tasks, we can use apply()
    const asyncResult = await myLibrary.apply();
```

both results will look like this
``` javascript
{
  plugins: [ /*some internal plugins*/  ],
  config: { name: 'Pluginize' },
  _context: true,
  addPlugin: [Function],
  hooks: {
    return: SyncHook {  },
    preInitPlugin: SyncWaterfallHook {},
    pluginsInitialized: SyncHook {  },
    initPlugin: SyncHook { }
  },
  log: [Function], //you can log sth with result.log(xxx)
  desactivateKeyCheck: [Function], 
  addHooks: [Function], // you can add hooks with result.addHooks
  on: [Function] // you can listen to hooks with result.on()
}
```
Yippie we have built our first library. But it does look how we want it. Let's change it.

## Add custom functions
Of course your library will need some functions that the users can use. Let's add some.

``` javascript
    const myLibrary = pluginize({
        init(config, context){
            //1st way to add sth in the context - modify the context object
            context.sayHelloDefault = function(){
                return 'hello ' + config.name;
            }

            //2nd way: every attribute returned will be added to the context
            return {
                sayHello(name){
                    return 'hello ' + name;
                }
            }
        }
    });

    //now our result includes these two functions
    const result = myLibrary.apply({name: 'heinrich'});
    result.sayHelloDefault(); // hello heinrich
    result.sayHello('Peter'); // hello peter

```