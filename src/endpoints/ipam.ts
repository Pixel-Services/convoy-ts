import { ConvoyClient } from '../client/ConvoyClient';
import {
  AddressPool,
  AddressPoolListParams,
  AddressPoolRequest,
  PoolAddressListParams,
  CreateAddressRequest,
  UpdateAddressRequest,
} from '../types/ipam';
import { NodeAddress } from '../types/node-address';
import { buildListParams } from '../utils/filters';

/**
 * IPAM-related API endpoints
 */
export class IpamEndpoints extends ConvoyClient {
  /**
   * List all address pools
   * @param params - Optional parameters for filtering and pagination
   * @returns Promise with array of address pools
   */
  async listAddressPools(params?: AddressPoolListParams): Promise<AddressPool[]> {
    const response = await this.get<AddressPool[]>(
      '/api/application/address-pools',
      buildListParams(params)
    );
    return response.data;
  }

  /**
   * Get a specific address pool
   * @param poolId - The ID of the pool to fetch
   * @returns Promise with the address pool data
   */
  async getAddressPool(poolId: number): Promise<AddressPool> {
    const response = await this.get<AddressPool>(`/api/application/address-pools/${poolId}`);
    return response.data;
  }

  /**
   * Create a new address pool
   * @param data - The data for the new pool
   * @returns Promise with the created address pool
   */
  async createAddressPool(data: AddressPoolRequest): Promise<AddressPool> {
    const response = await this.post<AddressPool>('/api/application/address-pools', data);
    return response.data;
  }

  /**
   * Update an existing address pool
   * @param poolId - The ID of the pool to update
   * @param data - The data to update the pool with
   * @returns Promise with the updated address pool
   */
  async updateAddressPool(poolId: number, data: AddressPoolRequest): Promise<AddressPool> {
    const response = await this.put<AddressPool>(
      `/api/application/address-pools/${poolId}`,
      data
    );
    return response.data;
  }

  /**
   * Delete an address pool
   * @param poolId - The ID of the pool to delete
   * @returns Promise that resolves when the pool is deleted
   */
  async deleteAddressPool(poolId: number): Promise<void> {
    await this.delete(`/api/application/address-pools/${poolId}`);
  }

  /**
   * List all addresses in a pool
   * @param poolId - The ID of the pool
   * @param params - Optional parameters for filtering and pagination
   * @returns Promise with array of addresses
   */
  async listPoolAddresses(poolId: number, params?: PoolAddressListParams): Promise<NodeAddress[]> {
    const response = await this.get<NodeAddress[]>(
      `/api/application/address-pools/${poolId}/addresses`,
      buildListParams(params)
    );
    return response.data;
  }

  /**
   * Create a new address or multiple addresses in a pool
   * @param poolId - The ID of the pool
   * @param data - The data for creating the address(es)
   * @returns Promise with the created address (for single address) or void (for multiple addresses)
   */
  async createPoolAddress(
    poolId: number,
    data: CreateAddressRequest
  ): Promise<NodeAddress | void> {
    if (data.is_bulk_action) {
      await this.post(`/api/application/address-pools/${poolId}/addresses`, data);
    } else {
      const response = await this.post<NodeAddress>(
        `/api/application/address-pools/${poolId}/addresses`,
        data
      );
      return response.data;
    }
  }

  /**
   * Update an address in a pool
   * @param poolId - The ID of the pool
   * @param addressId - The ID of the address to update
   * @param data - The data to update the address with
   * @returns Promise with the updated address
   */
  async updatePoolAddress(
    poolId: number,
    addressId: number,
    data: UpdateAddressRequest
  ): Promise<NodeAddress> {
    const response = await this.put<NodeAddress>(
      `/api/application/address-pools/${poolId}/addresses/${addressId}`,
      data
    );
    return response.data;
  }

  /**
   * Delete an address from a pool
   * @param poolId - The ID of the pool
   * @param addressId - The ID of the address to delete
   * @returns Promise that resolves when the address is deleted
   */
  async deletePoolAddress(poolId: number, addressId: number): Promise<void> {
    await this.delete(`/api/application/address-pools/${poolId}/addresses/${addressId}`);
  }
} 