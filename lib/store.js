const { PocketbaseUtility } = require('./utilities.js');

const PLUGIN_TYPE_ID = "node-red-library-pocketbase-store";

/**
 * PocketBaseStorePlugin integrates with Node-RED as a storage plugin using Pocketbase as a backend.
 */
class PocketBaseStorePlugin {
    /**
     * Initialize PocketBaseStorePlugin with configuration
     * @param {Object} config - Plugin configuration
     */
    constructor(config) {
        this.type = PLUGIN_TYPE_ID;
        this.id = config.id;
        this.label = config.label;

        this.pocketbaseUtility = new PocketbaseUtility({
            username: config.pocketbase_username,
            password: config.pocketbase_password,
            port: config.pocketbase_port,
        });
    }

    /**
     * Initialize the PocketBase store plugin.
     * @returns {Promise<void>}
     */
    async init() {
        console.log(`PocketBase Store Plugin Initialized.`);
    }

    /**
     * Retrieve a library entry by type and name.
     * @param {string} type - Entry type, e.g., "flows"
     * @param {string} name - Entry name
     * @returns {Promise<Object>} - Retrieved library entry
     */
    async getLibraryEntry(type, name) {
        if (type === "flows") {
            return await this.pocketbaseUtility.getFlow(name);
        }
    }

    /**
     * Retrieve a specific entry or all entries of a certain type.
     * @param {string} type - Entry type, e.g., "flows"
     * @param {string} [name] - Optional entry name
     * @returns {Promise<Object|Array<Object>>} - Retrieved entry or list of entries
     */
    async getEntry(type, name) {
        try {
            return name
                ? await this.pocketbaseUtility.getFlow(name)
                : await this.pocketbaseUtility.getAllFlowNames();
        } catch (error) {
            console.error(`Error retrieving entry: ${error.message}`);
            return [];
        }
    }

    /**
     * Save a library entry to Pocketbase.
     * @param {string} type - Entry type, e.g., "flows"
     * @param {string} name - Entry name
     * @param {Object} meta - Metadata for the entry
     * @param {Object} body - Entry content
     * @returns {Promise<Object>} - Saved library entry
     */
    async saveLibraryEntry(type, name, meta, body) {
        if (type === "flows") {
            const data = {
                name,
                description: body[0]?.info || "No description",
                content: body
            };
            return await this.pocketbaseUtility.saveFlow(data);
        }
    }

    /**
     * Save an entry, supporting backward compatibility.
     * @param {string} type - Entry type, e.g., "flows"
     * @param {string} name - Entry name
     * @param {Object} meta - Metadata for the entry
     * @param {Object} body - Entry content
     * @returns {Promise<Object>} - Saved entry
     */
    async saveEntry(type, name, meta, body) {
        return await this.saveLibraryEntry(type, name, meta, body);
    }
}

module.exports = { PocketBaseStorePlugin, PLUGIN_TYPE_ID };
