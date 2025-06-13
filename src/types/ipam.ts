import { AddressType } from './node-address';

/**
 * Represents an address pool in the Convoy system
 */
export interface AddressPool {
  id: number;
  name: string;
  nodes_count: number;
  addresses_count: number;
}

/**
 * Parameters for filtering address pools
 */
export interface AddressPoolFilters {
  name?: string;
}

/**
 * Parameters for listing address pools
 */
export interface AddressPoolListParams {
  page?: number;
  per_page?: number;
  filter?: AddressPoolFilters;
}

/**
 * Parameters for creating or updating an address pool
 */
export interface AddressPoolRequest {
  name: string;
  node_ids: number[];
}

/**
 * Parameters for filtering pool addresses
 */
export interface PoolAddressFilters {
  type?: AddressType;
  address?: string;
  '*'?: string; // Wildcard search (optional)
  server_id?: number | null;
}

/**
 * Parameters for listing pool addresses
 */
export interface PoolAddressListParams {
  page?: number;
  per_page?: number;
  filter?: PoolAddressFilters;
}

/**
 * Parameters for creating a single address
 */
export interface CreateSingleAddressRequest {
  is_bulk_action: false;
  mac_address: string | null;
  server_id: number | null;
  address: string;
  type: AddressType;
  cidr: number;
  gateway: string;
}

/**
 * Parameters for creating multiple addresses
 */
export interface CreateMultipleAddressesRequest {
  is_bulk_action: true;
  starting_address: string;
  ending_address: string;
  mac_address: string | null;
  server_id: number | null;
  type: AddressType;
  cidr: number;
  gateway: string;
}

/**
 * Union type for address creation requests
 */
export type CreateAddressRequest = CreateSingleAddressRequest | CreateMultipleAddressesRequest;

/**
 * Parameters for updating an address
 */
export interface UpdateAddressRequest {
  mac_address: string | null;
  server_id: number | null;
  address: string;
  type: AddressType;
  cidr: number;
  gateway: string;
} 