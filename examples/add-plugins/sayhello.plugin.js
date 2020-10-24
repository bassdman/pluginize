module.exports = {
    name: 'SayHelloPlugin',
    init(config, pluginConfig, context) {
        return {
            sayHelloDefault() {
                console.log('hello ' + config.name);
            },
            sayHello(name) {
                console.log('hello ' + name);
            }
        }
    }
}