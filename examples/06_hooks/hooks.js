const FeatureTogglePlugin = {
    name: "FeatureTogglePlugin",
    // Returns key featureToggle - we define it in onInit()
    return: 'featureToggle',

    /*
        Here we map 
        {
            featurea: true,
            featureb: false,
            featurec: true
        }
        to
        {
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
    /**
     * Here we define the library that will be returned
     * @param {*} config 
     */
    onInit(config) {
        return {
            featureToggle: {
                data: config.data,
                isActive: function(key) { return config.data[key] }
            }
        }
    },
    // we must allow key "data" because we use it in hook onPreInit()
    allowKeys: ['data'],
};

const featureToggle = pluginize({
    name: 'FeatureToggle',
    debug: true,

    plugins: [FeatureTogglePlugin]
});

/**
 * Will return an object {
 *  data: {
 *      featurea: true,
 *      featureb: false,
 *      featurec: true
 *  },
 *  isActive: function(){}
 * }
 */
const result = featureToggle({
    featurea: true,
    featureb: false,
    featurec: true
}).run();

console.log(result);