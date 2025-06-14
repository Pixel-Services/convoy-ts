import { ConvoyConfig, ApiResponse } from '../types';
/**
 * Main client class for interacting with the Convoy API
 */
export declare class ConvoyClient {
    private readonly client;
    protected readonly config: ConvoyConfig;
    /**
     * Creates a new instance of the Convoy client
     * @param config - The configuration for the client
     */
    constructor(config: ConvoyConfig);
    /**
     * Makes a GET request to the API
     * @param path - The API endpoint path
     * @param params - Optional query parameters
     * @returns Promise with the API response
     */
    protected get<T>(path: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
    /**
     * Makes a POST request to the API
     * @param path - The API endpoint path
     * @param data - The data to send
     * @returns Promise with the API response
     */
    protected post<T>(path: string, data: any): Promise<ApiResponse<T>>;
    /**
     * Makes a PUT request to the API
     * @param path - The API endpoint path
     * @param data - The data to send
     * @returns Promise with the API response
     */
    protected put<T>(path: string, data: any): Promise<ApiResponse<T>>;
    /**
     * Makes a DELETE request to the API
     * @param path - The API endpoint path
     * @returns Promise with the API response
     */
    protected delete<T>(path: string): Promise<ApiResponse<T>>;
    /**
     * Makes a PATCH request to the API
     * @param path - The API endpoint path
     * @param data - The data to send
     * @returns Promise with the API response
     */
    protected patch<T>(path: string, data: any): Promise<ApiResponse<T>>;
}
