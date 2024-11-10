const { PocketbaseUtility } = require('./utilities.js');

const PLUGIN_TYPE_ID = "node-red-library-pocketbase-store";

class PocketBaseStorePlugin {
    constructor(config) {
        this.type = PLUGIN_TYPE_ID;
        this.id = config.id;
        this.label = config.label;

        // Pocketbase configuration
        this.pocketbasePort = config.pocketbase_port;
        this.pocketbaseUsername = config.pocketbase_username;
        this.pocketbasePassword = config.pocketbase_password;
        this.pocketbaseUtility = null;
    }

    async init() {
        this.pocketbaseUtility = new PocketbaseUtility({
            "username": this.pocketbaseUsername,
            "password": this.pocketbasePassword,
            "port": this.pocketbasePort,
        });
        console.log(`Store Initialized.`);
    }

    async getLibraryEntry(type, name) {
        console.log("getLibraryEntry invoked.")
        if (type === "flows") {
            const data = await this.pocketbaseUtility.getFlow(name);
            return data;
        }
    }

    async getEntry(type, name) {
        console.log("getEntry invoked.")
        // for backward compatibility
        if (type === "flows") {
            try {
                const data = await this.pocketbaseUtility.getFlow(name);
                return data;
            } catch (error) {
                // console.error(error);
                return [];
            }
        }
    }

    async saveLibraryEntry(type, name, meta, body) {
        console.log("saveLibraryEntry invoked.")
        let content = body;
        if (type === "flows") {
            content = JSON.stringify(body);
        }

        try {
            const data = {
                "name": name,
                "description": body[0].info,
                "content": body
            };
            return await this.pocketbaseUtility.saveFlow(data);
        } catch (error) {
            if (error.response && error.response.code === 404) {
                return await this.pocketbaseUtility.saveFlow({
                    "name": name,
                    "content": content
                });
            } else {
                throw error;
            }
        }
    }

    async saveEntry(type, name, meta, body) {
        console.log("saveEntry called.")
        // for backward compatibility
        let content = body;
        if (type === "flows") {
            content = JSON.stringify(body);
        }

        try {
            const data = {
                "name": name,
                "description": body[0].info,
                "content": body
            };
            return await this.pocketbaseUtility.saveFlow(data);
        } catch (error) {
            if (error.response && error.response.code === 404) {
                return await this.pocketbaseUtility.saveFlow({
                    "name": name,
                    "content": content
                });
            } else {
                throw error;
            }
        }
    }
}

module.exports = { PocketBaseStorePlugin, PLUGIN_TYPE_ID };
