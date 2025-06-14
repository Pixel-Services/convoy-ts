import { ConvoyClient } from '../client/ConvoyClient';
import { Location, LocationListParams } from '../types/location';
/**
 * Location endpoints implementation
 */
export declare class LocationEndpoints extends ConvoyClient {
    /**
     * List all locations
     * @param params - Optional filtering and pagination parameters
     * @returns Promise with list of locations
     */
    listLocations(params?: LocationListParams): Promise<Location[]>;
}
