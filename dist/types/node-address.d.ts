/**
 * Represents an IP address type
 */
export type AddressType = 'ipv4' | 'ipv6';
/**
 * Represents a node address in the Convoy system
 */
export interface NodeAddress {
    id: number;
    address_pool_id: number;
    server_id: number | null;
    type: AddressType;
    address: string;
    cidr: number;
    gateway: string;
    mac_address: string | null;
}
/**
 * Parameters for filtering node addresses
 */
export interface NodeAddressFilters {
    address?: string;
    type?: AddressType;
    server_id?: number | null;
}
/**
 * Parameters for listing node addresses
 */
export interface NodeAddressListParams {
    page?: number;
    per_page?: number;
    filter?: NodeAddressFilters;
}
/**
 * Parameters for updating a node address
 */
export interface UpdateNodeAddressRequest {
    mac_address: string | null;
    server_id: number | null;
    address: string;
    type: AddressType;
    cidr: number;
    gateway: string;
}
