import { ConvoyClient } from '../client/ConvoyClient';
import { Location, LocationListParams } from '../types/location';
import { buildListParams } from '../utils/filters';

/**
 * Location endpoints implementation
 */
export class LocationEndpoints extends ConvoyClient {
  /**
   * List all locations
   * @param params - Optional filtering and pagination parameters
   * @returns Promise with list of locations
   */
  async listLocations(params?: LocationListParams): Promise<Location[]> {
    const response = await this.get<Location[]>('/api/application/locations', buildListParams(params));
    return response.data;
  }
} 