import { ConvoyClient } from '../client/ConvoyClient';
import { Server, CreateServerRequest, UpdateServerRequest, UpdateServerBuildRequest, ServerListParams, ServerStatus, ServerState, ConsoleType, ConsoleSession } from '../types/server';
/**
 * Server endpoints implementation
 */
export declare class ServerEndpoints extends ConvoyClient {
    /**
     * List all servers
     * @param params - Optional filtering and pagination parameters
     * @returns Promise with list of servers
     */
    listServers(params?: ServerListParams): Promise<Server[]>;
    /**
     * Get a specific server by UUID
     * @param uuid - The server UUID
     * @returns Promise with server details
     */
    getServer(uuid: string): Promise<Server>;
    /**
     * Create a new server
     * @param data - The server creation data
     * @returns Promise with the created server
     */
    createServer(data: CreateServerRequest): Promise<Server>;
    /**
     * Update a server's general information
     * @param uuid - The server UUID
     * @param data - The server update data
     * @returns Promise with the updated server
     */
    updateServer(uuid: string, data: UpdateServerRequest): Promise<Server>;
    /**
     * Update a server's build configuration
     * @param uuid - The server UUID
     * @param data - The server build update data
     * @returns Promise with the updated server
     */
    updateServerBuild(uuid: string, data: UpdateServerBuildRequest): Promise<Server>;
    /**
     * Delete a server
     * @param uuid - The server UUID
     * @param params - Optional deletion parameters
     * @returns Promise with the deletion result
     */
    deleteServer(uuid: string, params?: {
        no_purge?: boolean;
    }): Promise<void>;
    /**
     * Suspend a server
     * @param uuid - The server UUID
     * @returns Promise with the operation result
     */
    suspendServer(uuid: string): Promise<void>;
    /**
     * Unsuspend a server
     * @param uuid - The server UUID
     * @returns Promise with the operation result
     */
    unsuspendServer(uuid: string): Promise<void>;
    /**
     * Start a server
     * @param id - The server ID
     * @returns Promise with the updated server status
     */
    startServer(id: number): Promise<Server>;
    /**
     * Stop a server
     * @param id - The server ID
     * @returns Promise with the updated server status
     */
    stopServer(id: number): Promise<Server>;
    /**
     * Restart a server
     * @param id - The server ID
     * @returns Promise with the updated server status
     */
    restartServer(id: number): Promise<Server>;
    /**
     * Get server status
     * @param id - The server ID
     * @returns Promise with the server status
     */
    getServerStatus(id: number): Promise<ServerStatus>;
    /**
     * Get server state
     * @param uuid - The server UUID
     * @returns Promise with the server state
     */
    getState(uuid: string): Promise<ServerState>;
    /**
     * Create a console session for a server
     * @param uuid - Server UUID
     * @param type - Console type
     * @returns Promise with console session details
     * @warning This method requires a Convoy instance with the console session endpoint handler implemented.
     *          It will not work on any version of Convoy that doesn't have this feature.
     */
    createConsoleSession(uuid: string, type: ConsoleType): Promise<ConsoleSession>;
}
