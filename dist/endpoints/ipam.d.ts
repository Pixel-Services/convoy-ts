import { ConvoyClient } from '../client/ConvoyClient';
import { AddressPool, AddressPoolListParams, AddressPoolRequest, PoolAddressListParams, CreateAddressRequest, UpdateAddressRequest } from '../types/ipam';
import { NodeAddress } from '../types/node-address';
/**
 * IPAM-related API endpoints
 */
export declare class IpamEndpoints extends ConvoyClient {
    /**
     * List all address pools
     * @param params - Optional parameters for filtering and pagination
     * @returns Promise with array of address pools
     */
    listAddressPools(params?: AddressPoolListParams): Promise<AddressPool[]>;
    /**
     * Get a specific address pool
     * @param poolId - The ID of the pool to fetch
     * @returns Promise with the address pool data
     */
    getAddressPool(poolId: number): Promise<AddressPool>;
    /**
     * Create a new address pool
     * @param data - The data for the new pool
     * @returns Promise with the created address pool
     */
    createAddressPool(data: AddressPoolRequest): Promise<AddressPool>;
    /**
     * Update an existing address pool
     * @param poolId - The ID of the pool to update
     * @param data - The data to update the pool with
     * @returns Promise with the updated address pool
     */
    updateAddressPool(poolId: number, data: AddressPoolRequest): Promise<AddressPool>;
    /**
     * Delete an address pool
     * @param poolId - The ID of the pool to delete
     * @returns Promise that resolves when the pool is deleted
     */
    deleteAddressPool(poolId: number): Promise<void>;
    /**
     * List all addresses in a pool
     * @param poolId - The ID of the pool
     * @param params - Optional parameters for filtering and pagination
     * @returns Promise with array of addresses
     */
    listPoolAddresses(poolId: number, params?: PoolAddressListParams): Promise<NodeAddress[]>;
    /**
     * Create a new address or multiple addresses in a pool
     * @param poolId - The ID of the pool
     * @param data - The data for creating the address(es)
     * @returns Promise with the created address (for single address) or void (for multiple addresses)
     */
    createPoolAddress(poolId: number, data: CreateAddressRequest): Promise<NodeAddress | void>;
    /**
     * Update an address in a pool
     * @param poolId - The ID of the pool
     * @param addressId - The ID of the address to update
     * @param data - The data to update the address with
     * @returns Promise with the updated address
     */
    updatePoolAddress(poolId: number, addressId: number, data: UpdateAddressRequest): Promise<NodeAddress>;
    /**
     * Delete an address from a pool
     * @param poolId - The ID of the pool
     * @param addressId - The ID of the address to delete
     * @returns Promise that resolves when the address is deleted
     */
    deletePoolAddress(poolId: number, addressId: number): Promise<void>;
}
