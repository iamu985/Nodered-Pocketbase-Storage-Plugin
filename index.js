const { PocketBaseStorePlugin, PLUGIN_TYPE_ID } = require("./lib/store.js");
// import { PocketBaseStorePlugin, PLUGIN_TYPE_ID } from "./lib/store.js"

// // Export a function to register the plugin in Node-RED
module.exports = function (RED) {
    RED.plugins.registerPlugin(PLUGIN_TYPE_ID, {
        type: "node-red-library-source",
        class: PocketBaseStorePlugin,
    });
};

// const config = {
//     id: "pocketbase-nodered-library",
//     type: "node-red-library-pocketbase-store",
//     label: "Pocketbase Store",
//     pocketbase_port: 8090,
//     pocketbase_username: "frankbranogomes@gmail.com",
//     pocketbase_password: "heypresto985"
// }

// const store = new PocketBaseStorePlugin(config)

// const type = "flows"
// const path = ""
// const meta = {}
// const body = [{"id":"dd044a534bd012a9","type":"tab","label":"Random Test","disabled":false,"info":"Random Test","env":[]},{"id":"5fd95d4f34e504e7","type":"inject","z":"dd044a534bd012a9","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":540,"y":280,"wires":[["98922f6644ac26e7"]]},{"id":"98922f6644ac26e7","type":"debug","z":"dd044a534bd012a9","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":880,"y":280,"wires":[]}]

// await store.init()

// const reply = await store.getEntry(type, path)
// console.log(reply);