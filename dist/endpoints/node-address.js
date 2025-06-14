"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeAddressEndpoints = void 0;
const ConvoyClient_1 = require("../client/ConvoyClient");
const filters_1 = require("../utils/filters");
/**
 * Node address-related API endpoints
 */
class NodeAddressEndpoints extends ConvoyClient_1.ConvoyClient {
    /**
     * List all addresses for a specific node
     * @param nodeId - The ID of the node
     * @param params - Optional parameters for filtering and pagination
     * @returns Promise with array of node addresses
     */
    async listNodeAddresses(nodeId, params) {
        const response = await this.get(`/api/application/nodes/${nodeId}/addresses`, (0, filters_1.buildListParams)(params));
        return response.data;
    }
    /**
     * Update a specific address for a node
     * @param nodeId - The ID of the node
     * @param addressId - The ID of the address to update
     * @param data - The data to update the address with
     * @returns Promise with the updated node address
     */
    async updateNodeAddress(nodeId, addressId, data) {
        const response = await this.put(`/api/application/nodes/${nodeId}/addresses/${addressId}`, data);
        return response.data;
    }
    /**
     * Delete a specific address from a node
     * @param nodeId - The ID of the node
     * @param addressId - The ID of the address to delete
     * @returns Promise that resolves when the address is deleted
     */
    async deleteNodeAddress(nodeId, addressId) {
        await this.delete(`/api/application/nodes/${nodeId}/addresses/${addressId}`);
    }
}
exports.NodeAddressEndpoints = NodeAddressEndpoints;
//# sourceMappingURL=node-address.js.map