import { ConvoyClient } from '../client/ConvoyClient';
import { NodeAddress, NodeAddressListParams, UpdateNodeAddressRequest } from '../types/node-address';
import { buildListParams } from '../utils/filters';

/**
 * Node address-related API endpoints
 */
export class NodeAddressEndpoints extends ConvoyClient {
  /**
   * List all addresses for a specific node
   * @param nodeId - The ID of the node
   * @param params - Optional parameters for filtering and pagination
   * @returns Promise with array of node addresses
   */
  async listNodeAddresses(nodeId: number, params?: NodeAddressListParams): Promise<NodeAddress[]> {
    const response = await this.get<NodeAddress[]>(
      `/api/application/nodes/${nodeId}/addresses`,
      buildListParams(params)
    );
    return response.data;
  }

  /**
   * Update a specific address for a node
   * @param nodeId - The ID of the node
   * @param addressId - The ID of the address to update
   * @param data - The data to update the address with
   * @returns Promise with the updated node address
   */
  async updateNodeAddress(
    nodeId: number,
    addressId: number,
    data: UpdateNodeAddressRequest
  ): Promise<NodeAddress> {
    const response = await this.put<NodeAddress>(
      `/api/application/nodes/${nodeId}/addresses/${addressId}`,
      data
    );
    return response.data;
  }

  /**
   * Delete a specific address from a node
   * @param nodeId - The ID of the node
   * @param addressId - The ID of the address to delete
   * @returns Promise that resolves when the address is deleted
   */
  async deleteNodeAddress(nodeId: number, addressId: number): Promise<void> {
    await this.delete(`/api/application/nodes/${nodeId}/addresses/${addressId}`);
  }
} 