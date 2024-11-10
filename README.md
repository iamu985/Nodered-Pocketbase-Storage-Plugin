# PocketBase Node-RED Storage Plugin

[![npm version](https://badge.fury.io/js/@node-red%2Flibrary-pocketbase-store.svg)](https://badge.fury.io/js/@node-red%2Flibrary-pocketbase-store)

## Overview

`PocketBase Node-RED Storage Plugin` is a Node-RED plugin that enables storage and retrieval of Node-RED flow configurations using PocketBase as the backend. This plugin allows users to save and manage Node-RED flows in a PocketBase instance, making it a useful tool for collaborative and persistent flow management.

## Features

- **Save Node-RED Flows to PocketBase**: Stores flow configurations in PocketBase for easy management.
- **Retrieve Stored Flows**: Retrieve flow data and configurations from PocketBase to load into Node-RED.
- **Collaborative Storage**: Use PocketBase as a backend for centralized flow management.
- **Read and Write Compatibility**: Provides backward compatibility for both read and write operations on stored flows.

## Installation

1. **Install the plugin** via npm:
   ```bash
   npm install nodered-library-pocketbase-store
   ```

2. **Set up PocketBase** and ensure your PocketBase server is running and accessible. This plugin requires a PocketBase instance with the necessary collections configured.

3. **Update Node-RED Configuration**:
   - Add the plugin configuration in your Node-RED `settings.js` file to register the library plugin.

## Configuration

Add the following configuration to your `settings.js` file under `editorTheme`:

```javascript
editorTheme: {
    library: {
        sources: [
            {
                id: "pocketbase-storage",
                type: "node-red-library-pocketbase-store",
                label: "PocketBase Storage",
                icon: "fa-database",
                pocketbase_url: "http://localhost:8090", // Change to your PocketBase instance URL
                pocketbase_username: "<YOUR_USERNAME>",
                pocketbase_password: "<YOUR_PASSWORD>"
            }
        ]
    }
}
```

### Environment Variables
Alternatively, you can set up the following environment variables for configuration:
- `POCKETBASE_URL` - The URL to your PocketBase instance.
- `POCKETBASE_USERNAME` - The username for PocketBase admin authentication.
- `POCKETBASE_PASSWORD` - The password for PocketBase admin authentication.

## Usage

1. **Store Flows**: Once installed and configured, the plugin will save any flow configurations to PocketBase automatically.
   
2. **Retrieve Flows**: Flows stored in PocketBase will be accessible through the Node-RED editor library.

## API Reference

### `PocketBaseStorePlugin`

The main class for handling storage operations, initialized by Node-RED.

### Methods

#### `getLibraryEntry(type, name)`
Fetches a specific flow configuration based on the type and name.

#### `saveLibraryEntry(type, name, meta, body)`
Saves a new flow configuration or updates an existing one.

#### `getAllFlow()`
Retrieves a list of all stored flows in PocketBase.

## Example Code

### Example: Saving a Flow to PocketBase

```javascript
const flowData = {
    name: "sample-flow",
    description: "Sample flow for demonstration",
    content: [{ /* Node-RED flow JSON here */ }]
};

const savedFlow = await pocketbaseUtility.saveFlow(flowData);
console.log("Flow saved:", savedFlow);
```

### Example: Retrieving a Flow by Name

```javascript
const flowName = "sample-flow";
const flowContent = await pocketbaseUtility.getFlow(flowName);
console.log("Flow content:", flowContent);
```

## Troubleshooting

If you encounter issues:
- **Check PocketBase server status**: Make sure your PocketBase server is up and accessible.
- **Verify credentials**: Ensure the configured username and password are correct for the PocketBase instance.
- **Check plugin configuration**: Confirm that the `settings.js` file in Node-RED is set up correctly.

## Contributing

Feel free to open issues or submit pull requests for bug fixes, feature requests, or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.