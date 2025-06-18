import { ConvoyClient } from '../client/ConvoyClient';
import { ApiResponse, ConvoyConfig } from '../types';
import { ServerEndpoints } from '../endpoints/server';
import { BackupEndpoints } from '../endpoints/backup';

/**
 * Server status types
 */
export enum ServerStatus {
  RUNNING = 'running',
  STOPPED = 'stopped',
  SUSPENDED = 'suspended',
  ERROR = 'error',
  INSTALLING = 'installing',
}

/**
 * Server state actions
 */
export enum ServerStateAction {
  START = 'start',
  RESTART = 'restart',
  KILL = 'kill',
  SHUTDOWN = 'shutdown'
}

/**
 * Server type
 */
export enum ServerType {
  KVM = 'kvm',
  LXC = 'lxc',
}

/**
 * Server network address
 */
export interface ServerAddress {
  id: number;
  server_id: number;
  type: 'ipv4' | 'ipv6';
  address: string;
  cidr: number;
  gateway: string | null;
  mac_address: string | null;
}

/**
 * Server resource limits
 */
export interface ServerLimits {
  cpu: number;
  memory: number;
  disk: number;
  snapshots: number;
  backups: number | null;
  bandwidth: number | null;
  addresses: {
    ipv4: ServerAddress[];
    ipv6: ServerAddress[];
  };
  mac_address: string | null;
}

/**
 * Server usage metrics
 */
export interface ServerUsages {
  bandwidth: number;
}

/**
 * Server state response
 */
export interface ServerState {
  state: ServerStatus;
  cpu_used: number;
  memory_total: number;
  memory_used: number;
  uptime: number;
}

/**
 * Server model
 */
export interface Server {
  id: string;
  uuid: string;
  node_id: number;
  hostname: string;
  name: string;
  description: string | null;
  status: ServerStatus | null;
  usages: ServerUsages;
  limits: ServerLimits;
  user_id: number;
  vmid: number;
  internal_id: number;
  user?: {
    data: {
      id: number;
      name: string;
      email: string;
      email_verified_at: string | null;
      root_admin: boolean;
      servers_count: number;
    };
  };
  node?: {
    data: {
      id: number;
      location_id: number;
      name: string;
      cluster: string;
      fqdn: string;
      port: number;
      memory: number;
      memory_overallocate: number;
      memory_allocated: number;
      disk: number;
      disk_overallocate: number;
      disk_allocated: number;
      vm_storage: string;
      backup_storage: string;
      iso_storage: string;
      network: string;
      servers_count: number;
    };
  };
  getState(): Promise<ServerState>;
  createConsoleSession(type: ConsoleType): Promise<ConsoleSession>;
  reinstall(params: ReinstallServerRequest): Promise<void>;
  start(): Promise<void>;
  restart(): Promise<void>;
  kill(): Promise<void>;
  shutdown(): Promise<void>;
  changeName(newName: string): Promise<void>;
  changeHostname(newHostname: string): Promise<void>;
  backups: BackupEndpoints;
}

/**
 * Create server request
 */
export interface CreateServerRequest {
  node_id: number;
  user_id: number;
  name: string;
  hostname: string;
  vmid: number | null;
  limits: {
    cpu: number;
    memory: number;
    disk: number;
    snapshots: number;
    backups: number | null;
    bandwidth: number | null;
    address_ids: number[];
  };
  account_password: string;
  should_create_server: boolean;
  template_uuid: string;
  start_on_completion: boolean;
}

/**
 * Update server request
 */
export interface UpdateServerRequest {
  node_id?: number;
  user_id?: number;
  status?: ServerStatus | null;
  name?: string;
  hostname?: string;
  vmid?: number;
}

/**
 * Update server build request
 */
export interface UpdateServerBuildRequest {
  address_ids?: number[];
  snapshot_limit?: number;
  backup_limit?: number | null;
  bandwidth_limit?: number | null;
  bandwidth_usage?: number;
  cpu?: number;
  memory?: number;
  disk?: number;
}

/**
 * Server filter parameters
 */
export interface ServerFilters {
  name?: string;
  node_id?: number;
  user_id?: number;
}

/**
 * Server list parameters
 */
export interface ServerListParams {
  page?: number;
  per_page?: number;
  filter?: ServerFilters;
}

/**
 * Delete server parameters
 */
export interface DeleteServerParams {
  no_purge?: boolean;
}

/**
 * Console session type
 */
export enum ConsoleType {
  NOVNC = 'novnc',
  XTERMJS = 'xtermjs'
}

/**
 * Base console session properties
 */
interface BaseConsoleSession {
  fqdn: string;
  port: number;
}

/**
 * Console session with coterm enabled
 */
export interface CotermConsoleSession extends BaseConsoleSession {
  type: 'coterm';
  is_tls_enabled: boolean;
  token: string;
}

/**
 * Console session without coterm
 */
export interface StandardConsoleSession extends BaseConsoleSession {
  type: 'standard';
  ticket: string;
  node: string;
  vmid: number;
  consoleType: ConsoleType;
}

/**
 * Console session response
 */
export type ConsoleSession = CotermConsoleSession | StandardConsoleSession;

/**
 * Server implementation class that attaches methods to server objects
 */
export class ServerImpl implements Server {
  id!: string;
  uuid!: string;
  node_id!: number;
  hostname!: string;
  name!: string;
  description!: string | null;
  status!: ServerStatus | null;
  usages!: ServerUsages;
  limits!: ServerLimits;
  user_id!: number;
  vmid!: number;
  internal_id!: number;
  user?: {
    data: {
      id: number;
      name: string;
      email: string;
      email_verified_at: string | null;
      root_admin: boolean;
      servers_count: number;
    };
  };
  node?: {
    data: {
      id: number;
      location_id: number;
      name: string;
      cluster: string;
      fqdn: string;
      port: number;
      memory: number;
      memory_overallocate: number;
      memory_allocated: number;
      disk: number;
      disk_overallocate: number;
      disk_allocated: number;
      vm_storage: string;
      backup_storage: string;
      iso_storage: string;
      network: string;
      servers_count: number;
    };
  };

  private client: ServerEndpoints;
  public readonly backups: BackupEndpoints;

  constructor(data: Server, client: ServerEndpoints) {
    Object.assign(this, data);
    this.client = client;
    this.backups = new BackupEndpoints(client.getConfig(), this.uuid);
  }

  async getState(): Promise<ServerState> {
    return this.client.getState(this.uuid);
  }

  async createConsoleSession(type: ConsoleType): Promise<ConsoleSession> {
    return this.client.createConsoleSession(this.uuid, type);
  }

  async reinstall(params: ReinstallServerRequest): Promise<void> {
    await this.client.reinstall(this.uuid, params);
  }

  async start(): Promise<void> {
    await this.client.start(this.uuid);
  }

  async restart(): Promise<void> {
    await this.client.restart(this.uuid);
  }

  async kill(): Promise<void> {
    await this.client.kill(this.uuid);
  }

  async shutdown(): Promise<void> {
    await this.client.shutdown(this.uuid);
  }

  async changeName(newName: string): Promise<void> {
    await this.client.rename(this.uuid, { name: newName, hostname: this.hostname });
  }

  async changeHostname(newHostname: string): Promise<void> {
    await this.client.rename(this.uuid, { name: this.name, hostname: newHostname });
  }
}

/**
 * Reinstall server request
 */
export interface ReinstallServerRequest {
  account_password: string;
  start_on_completion: boolean;
  template_uuid: string;
} 