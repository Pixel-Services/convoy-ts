import { ConvoyClient } from '../client/ConvoyClient';
import { NodeAddress, NodeAddressListParams, UpdateNodeAddressRequest } from '../types/node-address';
/**
 * Node address-related API endpoints
 */
export declare class NodeAddressEndpoints extends ConvoyClient {
    /**
     * List all addresses for a specific node
     * @param nodeId - The ID of the node
     * @param params - Optional parameters for filtering and pagination
     * @returns Promise with array of node addresses
     */
    listNodeAddresses(nodeId: number, params?: NodeAddressListParams): Promise<NodeAddress[]>;
    /**
     * Update a specific address for a node
     * @param nodeId - The ID of the node
     * @param addressId - The ID of the address to update
     * @param data - The data to update the address with
     * @returns Promise with the updated node address
     */
    updateNodeAddress(nodeId: number, addressId: number, data: UpdateNodeAddressRequest): Promise<NodeAddress>;
    /**
     * Delete a specific address from a node
     * @param nodeId - The ID of the node
     * @param addressId - The ID of the address to delete
     * @returns Promise that resolves when the address is deleted
     */
    deleteNodeAddress(nodeId: number, addressId: number): Promise<void>;
}
