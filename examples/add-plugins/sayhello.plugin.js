module.exports = {
    name: 'SayHelloPlugin',
    init(config, context) {
        return {
            sayHelloDefault() {
                console.log('hello ' + context.config.name);
            },
            sayHello(name) {
                console.log('hello ' + name);
            }
        }
    }
}