const Pocketbase = require('pocketbase');
const { noderedAuthenticateUser } = require('./functions');
const { PocketBaseUtility } = require('./utilities');

const PLUGIN_TYPE_ID = "node-red-library-pocketbase-store";

class PocketBaseStorePlugin {
    constructor(config) {
        this.type = PLUGIN_TYPE_ID;
        this.id = config.id;
        this.label = config.label;

        // Pocketbase configuration
        this.pocketbaseBaseUrl = config.pocketbase_url;
        this.pocketbaseUsername = config.pocketbase_username;
        this.pocketbasePassword = config.pocketbase_password;

        this.pocketbaseClient = null;
    }

    async init() {
        const instance = new Pocketbase(this.pocketbaseBaseUrl);
        this.pocketbaseUtility = new PocketBaseUtility({
            "username": this.pocketbaseUsername,
            "password": this.pocketbasePassword,
            "instance": instance
        });
        console.log(`Store Initialized.`);
    }

    async getLibraryEntry(type, name) {
        if (type === "flows") {
            const data = await this.pocketbaseUtility.getFlow(name);
            return data;
        }
    }

    async saveLibraryEntry(type, name, meta, body) {
        let content = body;
        if (type === "flows") {
            content = JSON.stringify(body);
        }

        try {
            const data = {
                "name": name,
                "description": body[0].info,
                "content": body
            }
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
