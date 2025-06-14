"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpamEndpoints = void 0;
const ConvoyClient_1 = require("../client/ConvoyClient");
const filters_1 = require("../utils/filters");
/**
 * IPAM-related API endpoints
 */
class IpamEndpoints extends ConvoyClient_1.ConvoyClient {
    /**
     * List all address pools
     * @param params - Optional parameters for filtering and pagination
     * @returns Promise with array of address pools
     */
    async listAddressPools(params) {
        const response = await this.get('/api/application/address-pools', (0, filters_1.buildListParams)(params));
        return response.data;
    }
    /**
     * Get a specific address pool
     * @param poolId - The ID of the pool to fetch
     * @returns Promise with the address pool data
     */
    async getAddressPool(poolId) {
        const response = await this.get(`/api/application/address-pools/${poolId}`);
        return response.data;
    }
    /**
     * Create a new address pool
     * @param data - The data for the new pool
     * @returns Promise with the created address pool
     */
    async createAddressPool(data) {
        const response = await this.post('/api/application/address-pools', data);
        return response.data;
    }
    /**
     * Update an existing address pool
     * @param poolId - The ID of the pool to update
     * @param data - The data to update the pool with
     * @returns Promise with the updated address pool
     */
    async updateAddressPool(poolId, data) {
        const response = await this.put(`/api/application/address-pools/${poolId}`, data);
        return response.data;
    }
    /**
     * Delete an address pool
     * @param poolId - The ID of the pool to delete
     * @returns Promise that resolves when the pool is deleted
     */
    async deleteAddressPool(poolId) {
        await this.delete(`/api/application/address-pools/${poolId}`);
    }
    /**
     * List all addresses in a pool
     * @param poolId - The ID of the pool
     * @param params - Optional parameters for filtering and pagination
     * @returns Promise with array of addresses
     */
    async listPoolAddresses(poolId, params) {
        const response = await this.get(`/api/application/address-pools/${poolId}/addresses`, (0, filters_1.buildListParams)(params));
        return response.data;
    }
    /**
     * Create a new address or multiple addresses in a pool
     * @param poolId - The ID of the pool
     * @param data - The data for creating the address(es)
     * @returns Promise with the created address (for single address) or void (for multiple addresses)
     */
    async createPoolAddress(poolId, data) {
        if (data.is_bulk_action) {
            await this.post(`/api/application/address-pools/${poolId}/addresses`, data);
        }
        else {
            const response = await this.post(`/api/application/address-pools/${poolId}/addresses`, data);
            return response.data;
        }
    }
    /**
     * Update an address in a pool
     * @param poolId - The ID of the pool
     * @param addressId - The ID of the address to update
     * @param data - The data to update the address with
     * @returns Promise with the updated address
     */
    async updatePoolAddress(poolId, addressId, data) {
        const response = await this.put(`/api/application/address-pools/${poolId}/addresses/${addressId}`, data);
        return response.data;
    }
    /**
     * Delete an address from a pool
     * @param poolId - The ID of the pool
     * @param addressId - The ID of the address to delete
     * @returns Promise that resolves when the address is deleted
     */
    async deletePoolAddress(poolId, addressId) {
        await this.delete(`/api/application/address-pools/${poolId}/addresses/${addressId}`);
    }
}
exports.IpamEndpoints = IpamEndpoints;
//# sourceMappingURL=ipam.js.map