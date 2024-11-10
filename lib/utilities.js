const Pocketbase = require('pocketbase/cjs');

/**
 * Utility class for PocketBase operations, including authentication and CRUD operations for flows.
 */
class PocketbaseUtility {
    /**
     * Initialize PocketbaseUtility with the configuration.
     * @param {Object} config - Configuration for Pocketbase connection
     * @param {string} config.username - Pocketbase admin username
     * @param {string} config.password - Pocketbase admin password
     * @param {number} config.port - Pocketbase server port
     */
    constructor({ username, password, port }) {
        this.username = username;
        this.password = password;
        this.url = `http://localhost:${port}`;
        this.client = new Pocketbase(this.url);
    }

    /**
     * Authenticate the user if not already authenticated.
     * @returns {Promise<void>}
     */
    async authenticateUser() {
        if (!this.client.authStore.isValid) {
            await this.client.admins.authWithPassword(this.username, this.password);
        }
    }

    /**
     * Save or update a flow in Pocketbase.
     * @param {Object} data - Flow data to be saved
     * @returns {Promise<Object>} - Saved or updated flow data
     */
    async saveFlow(data) {
        await this.authenticateUser();

        try {
            const flow = await this.client.collection('flows').getFirstListItem(`name = "${data.name}"`);
            return await this.client.collection('flows').update(flow.id, data);
        } catch {
            // Create new flow if it does not exist
            return await this.client.collection('flows').create(data);
        }
    }

    /**
     * Retrieve a flow by name.
     * @param {string} name - Name of the flow
     * @returns {Promise<Object>} - Flow content if exists
     * @throws Will throw an error if the flow does not exist
     */
    async getFlow(name) {
        await this.authenticateUser();
        const flowData = await this.client.collection('flows').getFirstListItem(`name = "${name}"`);
        if (!flowData) {
            throw new Error("Flow does not exist");
        }
        return flowData.content;
    }

    /**
     * Retrieve all flow names.
     * @returns {Promise<Array<Object>>} - List of flow names
     */
    async getAllFlowNames() {
        await this.authenticateUser();
        const flowData = await this.client.collection('flows').getFullList({ sort: '-created', fields: 'name' });
        return flowData.map(item => ({ fn: item.name }));
    }
}

module.exports = { PocketbaseUtility };
