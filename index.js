const { PocketBaseStorePlugin, PLUGIN_TYPE_ID } = require("./lib/store.js");

// Export a function to register the plugin in Node-RED
module.exports = function (RED) {
    RED.plugins.registerPlugin(PLUGIN_TYPE_ID, {
        type: "node-red-library-source",
        class: PocketBaseStorePlugin,
    });
};
