module.exports = function(customConfig = {}) {
    return {
        name: 'SayHelloPlugin-Customconfig',
        onInit(config, pluginConfig, context) {
            return {
                sayHelloDefaultCustom() {
                    if (customConfig.really == 'yes')
                        console.log('hello ' + config.name);
                },
                sayHelloCustom(name) {
                    console.log('hello ' + name);
                }
            }
        }
    }
}