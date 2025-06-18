import { ConvoyClient } from '../client/ConvoyClient';
import { Server, CreateServerRequest, UpdateServerRequest, UpdateServerBuildRequest, ServerListParams, ServerState, ConsoleType, ConsoleSession, ReinstallServerRequest, ServerStateAction } from '../types/server';
import { ConvoyConfig } from '../types';
interface RenameServerRequest {
    name: string;
    hostname: string;
}
/**
 * Server endpoints implementation
 */
export declare class ServerEndpoints extends ConvoyClient {
    /**
     * Get the client configuration
     * @returns The client configuration
     */
    getConfig(): ConvoyConfig;
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
     * Change the server state
     * @param uuid - The server UUID
     * @param action - The state action to perform
     * @returns Promise that resolves when the state change is complete
     * @throws Error if the state change is not allowed
     */
    alterState(uuid: string, action: ServerStateAction): Promise<void>;
    /**
     * Start the server
     * @param uuid - The server UUID
     * @returns Promise that resolves when the server is started
     */
    start(uuid: string): Promise<void>;
    /**
     * Restart the server
     * @param uuid - The server UUID
     * @returns Promise that resolves when the server is restarted
     */
    restart(uuid: string): Promise<void>;
    /**
     * Kill the server
     * @param uuid - The server UUID
     * @returns Promise that resolves when the server is killed
     */
    kill(uuid: string): Promise<void>;
    /**
     * Shutdown the server
     * @param uuid - The server UUID
     * @returns Promise that resolves when the server is shut down
     */
    shutdown(uuid: string): Promise<void>;
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
    /**
     * Reinstall a server
     * @param uuid - The server UUID
     * @param params - The reinstall parameters
     * @returns Promise that resolves when the reinstall is complete
     */
    reinstall(uuid: string, params: ReinstallServerRequest): Promise<void>;
    /**
     * Rename a server
     * @param uuid - The server UUID
     * @param params - The rename parameters containing name and hostname
     * @returns Promise that resolves when the rename is complete
     */
    rename(uuid: string, params: RenameServerRequest): Promise<void>;
}
export {};
