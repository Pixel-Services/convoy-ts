"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerEndpoints = void 0;
const ConvoyClient_1 = require("../client/ConvoyClient");
const server_1 = require("../types/server");
const filters_1 = require("../utils/filters");
/**
 * Server endpoints implementation
 */
class ServerEndpoints extends ConvoyClient_1.ConvoyClient {
    /**
     * List all servers
     * @param params - Optional filtering and pagination parameters
     * @returns Promise with list of servers
     */
    async listServers(params) {
        const response = await this.get('/api/application/servers', (0, filters_1.buildListParams)(params));
        if (!response.data) {
            return [];
        }
        return response.data.map(server => new server_1.ServerImpl(server, this));
    }
    /**
     * Get a specific server by UUID
     * @param uuid - The server UUID
     * @returns Promise with server details
     */
    async getServer(uuid) {
        const response = await this.get(`/api/application/servers/${uuid}`);
        return new server_1.ServerImpl(response.data.data, this);
    }
    /**
     * Create a new server
     * @param data - The server creation data
     * @returns Promise with the created server
     */
    async createServer(data) {
        const response = await this.post('/api/application/servers', data);
        return new server_1.ServerImpl(response.data.data, this);
    }
    /**
     * Update a server's general information
     * @param uuid - The server UUID
     * @param data - The server update data
     * @returns Promise with the updated server
     */
    async updateServer(uuid, data) {
        const response = await this.patch(`/api/application/servers/${uuid}`, data);
        return new server_1.ServerImpl(response.data.data, this);
    }
    /**
     * Update a server's build configuration
     * @param uuid - The server UUID
     * @param data - The server build update data
     * @returns Promise with the updated server
     */
    async updateServerBuild(uuid, data) {
        const response = await this.patch(`/api/application/servers/${uuid}/settings/build`, data);
        return new server_1.ServerImpl(response.data.data, this);
    }
    /**
     * Delete a server
     * @param uuid - The server UUID
     * @param params - Optional deletion parameters
     * @returns Promise with the deletion result
     */
    async deleteServer(uuid, params) {
        await this.delete(`/api/application/servers/${uuid}?${new URLSearchParams(params).toString()}`);
    }
    /**
     * Suspend a server
     * @param uuid - The server UUID
     * @returns Promise with the operation result
     */
    async suspendServer(uuid) {
        await this.post(`/api/application/servers/${uuid}/settings/suspend`, {});
    }
    /**
     * Unsuspend a server
     * @param uuid - The server UUID
     * @returns Promise with the operation result
     */
    async unsuspendServer(uuid) {
        await this.post(`/api/application/servers/${uuid}/settings/unsuspend`, {});
    }
    /**
     * Start a server
     * @param id - The server ID
     * @returns Promise with the updated server status
     */
    async startServer(id) {
        const response = await this.post(`/api/application/servers/${id}/start`, {});
        return response.data;
    }
    /**
     * Stop a server
     * @param id - The server ID
     * @returns Promise with the updated server status
     */
    async stopServer(id) {
        const response = await this.post(`/api/application/servers/${id}/stop`, {});
        return response.data;
    }
    /**
     * Restart a server
     * @param id - The server ID
     * @returns Promise with the updated server status
     */
    async restartServer(id) {
        const response = await this.post(`/api/application/servers/${id}/restart`, {});
        return response.data;
    }
    /**
     * Get server status
     * @param id - The server ID
     * @returns Promise with the server status
     */
    async getServerStatus(id) {
        const response = await this.get(`/api/application/servers/${id}/status`);
        return response.data.status;
    }
    /**
     * Get server state
     * @param uuid - The server UUID
     * @returns Promise with the server state
     */
    async getState(uuid) {
        const response = await this.get(`/api/application/servers/${uuid}/state`);
        return response.data.data;
    }
    /**
     * Create a console session for a server
     * @param uuid - Server UUID
     * @param type - Console type
     * @returns Promise with console session details
     * @warning This method requires a Convoy instance with the console session endpoint handler implemented.
     *          It will not work on any version of Convoy that doesn't have this feature.
     */
    async createConsoleSession(uuid, type) {
        const response = await this.post(`/api/application/servers/${uuid}/create-console-session`, { type });
        if ('ticket' in response.data) {
            return { ...response.data, consoleType: type };
        }
        return response.data;
    }
}
exports.ServerEndpoints = ServerEndpoints;
//# sourceMappingURL=server.js.map