import { ConvoyClient } from '../client/ConvoyClient';
import { Node, NodeListParams } from '../types/node';
/**
 * Node-related API endpoints
 */
export declare class NodeEndpoints extends ConvoyClient {
    /**
     * List all nodes
     * @param params - Optional parameters for filtering and pagination
     * @returns Promise with array of nodes
     */
    listNodes(params?: NodeListParams): Promise<Node[]>;
    /**
     * Get a specific node by ID
     * @param id - The ID of the node to fetch
     * @returns Promise with the node data
     */
    getNode(id: number): Promise<Node>;
}
