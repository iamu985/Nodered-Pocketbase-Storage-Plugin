/**
 * Main entry file for the Node-RED PocketBase Library Plugin
 */
const { PocketBaseStorePlugin, PLUGIN_TYPE_ID } = require("./lib/store.js");

/**
 * Register the plugin with Node-RED
 * @param {object} RED - The Node-RED instance
 */
module.exports = function (RED) {
    RED.plugins.registerPlugin(PLUGIN_TYPE_ID, {
        type: "node-red-library-source",
        class: PocketBaseStorePlugin,
    });
};
