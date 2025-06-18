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
     * Get the client configuration
     * @returns The client configuration
     */
    getConfig() {
        return this.config;
    }
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
     * Change the server state
     * @param uuid - The server UUID
     * @param action - The state action to perform
     * @returns Promise that resolves when the state change is complete
     * @throws Error if the state change is not allowed
     */
    async alterState(uuid, action) {
        const currentState = await this.getState(uuid);
        switch (action) {
            case server_1.ServerStateAction.START:
                if (currentState.state === server_1.ServerStatus.RUNNING) {
                    throw new Error('Server is already running');
                }
                break;
            case server_1.ServerStateAction.RESTART:
                if (currentState.state !== server_1.ServerStatus.RUNNING) {
                    throw new Error('Server must be running to restart');
                }
                break;
            case server_1.ServerStateAction.KILL:
                if (currentState.state === server_1.ServerStatus.STOPPED) {
                    throw new Error('Server is already stopped');
                }
                break;
            case server_1.ServerStateAction.SHUTDOWN:
                if (currentState.state === server_1.ServerStatus.STOPPED) {
                    throw new Error('Server is already stopped');
                }
                break;
        }
        await this.patch(`/api/client/servers/${uuid}/state`, { state: action });
    }
    /**
     * Start the server
     * @param uuid - The server UUID
     * @returns Promise that resolves when the server is started
     */
    async start(uuid) {
        await this.alterState(uuid, server_1.ServerStateAction.START);
    }
    /**
     * Restart the server
     * @param uuid - The server UUID
     * @returns Promise that resolves when the server is restarted
     */
    async restart(uuid) {
        await this.alterState(uuid, server_1.ServerStateAction.RESTART);
    }
    /**
     * Kill the server
     * @param uuid - The server UUID
     * @returns Promise that resolves when the server is killed
     */
    async kill(uuid) {
        await this.alterState(uuid, server_1.ServerStateAction.KILL);
    }
    /**
     * Shutdown the server
     * @param uuid - The server UUID
     * @returns Promise that resolves when the server is shut down
     */
    async shutdown(uuid) {
        await this.alterState(uuid, server_1.ServerStateAction.SHUTDOWN);
    }
    /**
     * Get server state
     * @param uuid - The server UUID
     * @returns Promise with the server state
     */
    async getState(uuid) {
        const response = await this.get(`/api/client/servers/${uuid}/state`);
        return response.data;
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
    /**
     * Reinstall a server
     * @param uuid - The server UUID
     * @param params - The reinstall parameters
     * @returns Promise that resolves when the reinstall is complete
     */
    async reinstall(uuid, params) {
        await this.post(`/api/client/servers/${uuid}/settings/reinstall`, params);
    }
    /**
     * Rename a server
     * @param uuid - The server UUID
     * @param params - The rename parameters containing name and hostname
     * @returns Promise that resolves when the rename is complete
     */
    async rename(uuid, params) {
        await this.post(`/api/client/servers/${uuid}/settings/rename`, params);
    }
}
exports.ServerEndpoints = ServerEndpoints;
//# sourceMappingURL=server.js.map