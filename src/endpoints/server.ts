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
  ReinstallServerRequest,
  ServerStateAction,
} from '../types/server';
import { buildListParams } from '../utils/filters';
import { ConvoyConfig } from '../types';

interface RenameServerRequest {
  name: string;
  hostname: string;
}

/**
 * Server endpoints implementation
 */
export class ServerEndpoints extends ConvoyClient {
  /**
   * Get the client configuration
   * @returns The client configuration
   */
  getConfig(): ConvoyConfig {
    return this.config;
  }

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
   * Change the server state
   * @param uuid - The server UUID
   * @param action - The state action to perform
   * @returns Promise that resolves when the state change is complete
   * @throws Error if the state change is not allowed
   */
  async alterState(uuid: string, action: ServerStateAction): Promise<void> {
    const currentState = await this.getState(uuid);
    
    switch (action) {
      case ServerStateAction.START:
        if (currentState.state === ServerStatus.RUNNING) {
          throw new Error('Server is already running');
        }
        break;
      case ServerStateAction.RESTART:
        if (currentState.state !== ServerStatus.RUNNING) {
          throw new Error('Server must be running to restart');
        }
        break;
      case ServerStateAction.KILL:
        if (currentState.state === ServerStatus.STOPPED) {
          throw new Error('Server is already stopped');
        }
        break;
      case ServerStateAction.SHUTDOWN:
        if (currentState.state === ServerStatus.STOPPED) {
          throw new Error('Server is already stopped');
        }
        break;
    }

    await this.patch<void>(`/api/client/servers/${uuid}/state`, { state: action });
  }

  /**
   * Start the server
   * @param uuid - The server UUID
   * @returns Promise that resolves when the server is started
   */
  async start(uuid: string): Promise<void> {
    await this.alterState(uuid, ServerStateAction.START);
  }

  /**
   * Restart the server
   * @param uuid - The server UUID
   * @returns Promise that resolves when the server is restarted
   */
  async restart(uuid: string): Promise<void> {
    await this.alterState(uuid, ServerStateAction.RESTART);
  }

  /**
   * Kill the server
   * @param uuid - The server UUID
   * @returns Promise that resolves when the server is killed
   */
  async kill(uuid: string): Promise<void> {
    await this.alterState(uuid, ServerStateAction.KILL);
  }

  /**
   * Shutdown the server
   * @param uuid - The server UUID
   * @returns Promise that resolves when the server is shut down
   */
  async shutdown(uuid: string): Promise<void> {
    await this.alterState(uuid, ServerStateAction.SHUTDOWN);
  }

  /**
   * Get server state
   * @param uuid - The server UUID
   * @returns Promise with the server state
   */
  async getState(uuid: string): Promise<ServerState> {
    const response = await this.get<ServerState>(`/api/client/servers/${uuid}/state`);
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
  async createConsoleSession(uuid: string, type: ConsoleType): Promise<ConsoleSession> {
    const response = await this.post<ConsoleSession>(`/api/application/servers/${uuid}/create-console-session`, { type });
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
  async reinstall(uuid: string, params: ReinstallServerRequest): Promise<void> {
    await this.post<void>(`/api/client/servers/${uuid}/settings/reinstall`, params);
  }

  /**
   * Rename a server
   * @param uuid - The server UUID
   * @param params - The rename parameters containing name and hostname
   * @returns Promise that resolves when the rename is complete
   */
  async rename(uuid: string, params: RenameServerRequest): Promise<void> {
    await this.post<void>(`/api/client/servers/${uuid}/settings/rename`, params);
  }
} 