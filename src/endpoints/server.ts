import { ConvoyClient } from '../client/ConvoyClient';
import {
  Server,
  CreateServerRequest,
  UpdateServerRequest,
  UpdateServerBuildRequest,
  ServerListParams,
  ServerStatus,
  DeleteServerParams,
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
    const response = await this.get<Server[]>('/servers', buildListParams(params));
    return response.data;
  }

  /**
   * Get a specific server by UUID
   * @param uuid - The server UUID
   * @returns Promise with server details
   */
  async getServer(uuid: string): Promise<Server> {
    const response = await this.get<Server>(`/servers/${uuid}`);
    return response.data;
  }

  /**
   * Create a new server
   * @param data - The server creation data
   * @returns Promise with the created server
   */
  async createServer(data: CreateServerRequest): Promise<Server> {
    const response = await this.post<Server>('/servers', data);
    return response.data;
  }

  /**
   * Update a server's general information
   * @param uuid - The server UUID
   * @param data - The server update data
   * @returns Promise with the updated server
   */
  async updateServer(uuid: string, data: UpdateServerRequest): Promise<Server> {
    const response = await this.patch<Server>(`/servers/${uuid}`, data);
    return response.data;
  }

  /**
   * Update a server's build configuration
   * @param uuid - The server UUID
   * @param data - The server build update data
   * @returns Promise with the updated server
   */
  async updateServerBuild(uuid: string, data: UpdateServerBuildRequest): Promise<Server> {
    const response = await this.patch<Server>(`/servers/${uuid}/settings/build`, data);
    return response.data;
  }

  /**
   * Delete a server
   * @param uuid - The server UUID
   * @param params - Optional deletion parameters
   * @returns Promise with the deletion result
   */
  async deleteServer(uuid: string, params?: { no_purge?: boolean }): Promise<void> {
    await this.delete<void>(`/servers/${uuid}?${new URLSearchParams(params as Record<string, string>).toString()}`);
  }

  /**
   * Suspend a server
   * @param uuid - The server UUID
   * @returns Promise with the operation result
   */
  async suspendServer(uuid: string): Promise<void> {
    await this.post<void>(`/servers/${uuid}/settings/suspend`, {});
  }

  /**
   * Unsuspend a server
   * @param uuid - The server UUID
   * @returns Promise with the operation result
   */
  async unsuspendServer(uuid: string): Promise<void> {
    await this.post<void>(`/servers/${uuid}/settings/unsuspend`, {});
  }

  /**
   * Start a server
   * @param id - The server ID
   * @returns Promise with the updated server status
   */
  async startServer(id: number): Promise<Server> {
    const response = await this.post<Server>(`/servers/${id}/start`, {});
    return response.data;
  }

  /**
   * Stop a server
   * @param id - The server ID
   * @returns Promise with the updated server status
   */
  async stopServer(id: number): Promise<Server> {
    const response = await this.post<Server>(`/servers/${id}/stop`, {});
    return response.data;
  }

  /**
   * Restart a server
   * @param id - The server ID
   * @returns Promise with the updated server status
   */
  async restartServer(id: number): Promise<Server> {
    const response = await this.post<Server>(`/servers/${id}/restart`, {});
    return response.data;
  }

  /**
   * Get server status
   * @param id - The server ID
   * @returns Promise with the server status
   */
  async getServerStatus(id: number): Promise<ServerStatus> {
    const response = await this.get<{ status: ServerStatus }>(`/servers/${id}/status`);
    return response.data.status;
  }
} 