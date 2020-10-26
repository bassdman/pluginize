function foreachPlugin(plugin, cb) {
    cb(plugin);
    let _plugin;
    for (_plugin of(plugin.plugins || [])) {
        foreachPlugin(_plugin, cb);
    }
}

async function foreachPluginAsync(plugin, cb) {
    cb(plugin);
    let _plugin;
    for (_plugin of(plugin.plugins || [])) {
        await foreachPluginAsync(_plugin, cb);
    }
}

export { foreachPlugin, foreachPluginAsync };