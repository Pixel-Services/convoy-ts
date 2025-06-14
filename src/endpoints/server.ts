import { ConvoyClient } from '../client/ConvoyClient';
import {
  Server,
  CreateServerRequest,
  UpdateServerRequest,
  UpdateServerBuildRequest,
  ServerListParams,
  ServerStatus,
  DeleteServerParams,
  ServerState,
  ConsoleType,
  ConsoleSession,
  ServerImpl,
} from '../types/server';
import { buildListParams } from '../utils/filters';

/**
 * Server endpoints implementation
 */
export class ServerEndpoints extends ConvoyClient {
  /**
   * List all servers
   * @param params - Optional filtering and pagination parameters
   * @returns Promise with list of servers
   */
  async listServers(params?: ServerListParams): Promise<Server[]> {
    const response = await this.get<Server[]>('/api/application/servers', buildListParams(params));
    if (!response.data) {
      return [];
    }
    return response.data.map(server => new ServerImpl(server, this));
  }

  /**
   * Get a specific server by UUID
   * @param uuid - The server UUID
   * @returns Promise with server details
   */
  async getServer(uuid: string): Promise<Server> {
    const response = await this.get<{ data: Server }>(`/api/application/servers/${uuid}`);
    return new ServerImpl(response.data.data, this);
  }

  /**
   * Create a new server
   * @param data - The server creation data
   * @returns Promise with the created server
   */
  async createServer(data: CreateServerRequest): Promise<Server> {
    const response = await this.post<{ data: Server }>('/api/application/servers', data);
    return new ServerImpl(response.data.data, this);
  }

  /**
   * Update a server's general information
   * @param uuid - The server UUID
   * @param data - The server update data
   * @returns Promise with the updated server
   */
  async updateServer(uuid: string, data: UpdateServerRequest): Promise<Server> {
    const response = await this.patch<{ data: Server }>(`/api/application/servers/${uuid}`, data);
    return new ServerImpl(response.data.data, this);
  }

  /**
   * Update a server's build configuration
   * @param uuid - The server UUID
   * @param data - The server build update data
   * @returns Promise with the updated server
   */
  async updateServerBuild(uuid: string, data: UpdateServerBuildRequest): Promise<Server> {
    const response = await this.patch<{ data: Server }>(`/api/application/servers/${uuid}/settings/build`, data);
    return new ServerImpl(response.data.data, this);
  }

  /**
   * Delete a server
   * @param uuid - The server UUID
   * @param params - Optional deletion parameters
   * @returns Promise with the deletion result
   */
  async deleteServer(uuid: string, params?: { no_purge?: boolean }): Promise<void> {
    await this.delete<void>(`/api/application/servers/${uuid}?${new URLSearchParams(params as Record<string, string>).toString()}`);
  }

  /**
   * Suspend a server
   * @param uuid - The server UUID
   * @returns Promise with the operation result
   */
  async suspendServer(uuid: string): Promise<void> {
    await this.post<void>(`/api/application/servers/${uuid}/settings/suspend`, {});
  }

  /**
   * Unsuspend a server
   * @param uuid - The server UUID
   * @returns Promise with the operation result
   */
  async unsuspendServer(uuid: string): Promise<void> {
    await this.post<void>(`/api/application/servers/${uuid}/settings/unsuspend`, {});
  }

  /**
   * Start a server
   * @param id - The server ID
   * @returns Promise with the updated server status
   */
  async startServer(id: number): Promise<Server> {
    const response = await this.post<Server>(`/api/application/servers/${id}/start`, {});
    return response.data;
  }

  /**
   * Stop a server
   * @param id - The server ID
   * @returns Promise with the updated server status
   */
  async stopServer(id: number): Promise<Server> {
    const response = await this.post<Server>(`/api/application/servers/${id}/stop`, {});
    return response.data;
  }

  /**
   * Restart a server
   * @param id - The server ID
   * @returns Promise with the updated server status
   */
  async restartServer(id: number): Promise<Server> {
    const response = await this.post<Server>(`/api/application/servers/${id}/restart`, {});
    return response.data;
  }

  /**
   * Get server status
   * @param id - The server ID
   * @returns Promise with the server status
   */
  async getServerStatus(id: number): Promise<ServerStatus> {
    const response = await this.get<{ status: ServerStatus }>(`/api/application/servers/${id}/status`);
    return response.data.status;
  }

  /**
   * Get server state
   * @param uuid - The server UUID
   * @returns Promise with the server state
   */
  async getState(uuid: string): Promise<ServerState> {
    const response = await this.get<{ data: ServerState }>(`/api/application/servers/${uuid}/state`);
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
  async createConsoleSession(uuid: string, type: ConsoleType): Promise<ConsoleSession> {
    const response = await this.post<ConsoleSession>(`/api/application/servers/${uuid}/create-console-session`, { type });
    if ('ticket' in response.data) {
      return { ...response.data, consoleType: type };
    }
    return response.data;
  }
} 