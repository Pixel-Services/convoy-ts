"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEndpoints = void 0;
const ConvoyClient_1 = require("../client/ConvoyClient");
const filters_1 = require("../utils/filters");
/**
 * Node-related API endpoints
 */
class NodeEndpoints extends ConvoyClient_1.ConvoyClient {
    /**
     * List all nodes
     * @param params - Optional parameters for filtering and pagination
     * @returns Promise with array of nodes
     */
    async listNodes(params) {
        const response = await this.get('/api/application/nodes', (0, filters_1.buildListParams)(params));
        return response.data;
    }
    /**
     * Get a specific node by ID
     * @param id - The ID of the node to fetch
     * @returns Promise with the node data
     */
    async getNode(id) {
        const response = await this.get(`/api/application/nodes/${id}`);
        return response.data;
    }
}
exports.NodeEndpoints = NodeEndpoints;
//# sourceMappingURL=node.js.map