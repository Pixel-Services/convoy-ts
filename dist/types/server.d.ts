import { ServerEndpoints } from '../endpoints/server';
/**
 * Server status types
 */
export declare enum ServerStatus {
    RUNNING = "running",
    STOPPED = "stopped",
    SUSPENDED = "suspended",
    ERROR = "error",
    INSTALLING = "installing"
}
/**
 * Server type
 */
export declare enum ServerType {
    KVM = "kvm",
    LXC = "lxc"
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
export declare enum ConsoleType {
    NOVNC = "novnc",
    XTERMJS = "xtermjs"
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
export declare class ServerImpl implements Server {
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
    private client;
    constructor(data: Server, client: ServerEndpoints);
    getState(): Promise<ServerState>;
    createConsoleSession(type: ConsoleType): Promise<ConsoleSession>;
}
export {};
