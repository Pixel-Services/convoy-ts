/**
 * Represents a node in the Convoy system
 */
export interface Node {
    id: number;
    location_id: number;
    name: string;
    cluster: string;
    verify_tls: boolean;
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
}
/**
 * Parameters for filtering nodes
 */
export interface NodeFilters {
    name?: string;
    fqdn?: string;
    location_id?: number;
}
/**
 * Parameters for listing nodes
 */
export interface NodeListParams {
    page?: number;
    per_page?: number;
    filter?: NodeFilters;
}
