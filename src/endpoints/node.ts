import { ConvoyClient } from '../client/ConvoyClient';
import { Node, NodeListParams } from '../types/node';
import { buildListParams } from '../utils/filters';

/**
 * Node-related API endpoints
 */
export class NodeEndpoints extends ConvoyClient {
  /**
   * List all nodes
   * @param params - Optional parameters for filtering and pagination
   * @returns Promise with array of nodes
   */
  async listNodes(params?: NodeListParams): Promise<Node[]> {
    const response = await this.get<Node[]>('/api/application/nodes', buildListParams(params));
    return response.data;
  }

  /**
   * Get a specific node by ID
   * @param id - The ID of the node to fetch
   * @returns Promise with the node data
   */
  async getNode(id: number): Promise<Node> {
    const response = await this.get<Node>(`/api/application/nodes/${id}`);
    return response.data;
  }
} 