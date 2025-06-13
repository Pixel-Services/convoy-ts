import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ConvoyConfig, ApiResponse, ApiError } from '../types';

/**
 * Main client class for interacting with the Convoy API
 */
export class ConvoyClient {
  private readonly client: AxiosInstance;
  private readonly config: ConvoyConfig;

  /**
   * Creates a new instance of the Convoy client
   * @param config - The configuration for the client
   */
  constructor(config: ConvoyConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response) {
          const apiError: ApiError = {
            message: (error.response.data as any).message || 'An error occurred',
            errors: (error.response.data as any).errors,
            status: error.response.status,
          };
          return Promise.reject(apiError);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Makes a GET request to the API
   * @param path - The API endpoint path
   * @param params - Optional query parameters
   * @returns Promise with the API response
   */
  protected async get<T>(path: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(path, { params });
    return response.data;
  }

  /**
   * Makes a POST request to the API
   * @param path - The API endpoint path
   * @param data - The data to send
   * @returns Promise with the API response
   */
  protected async post<T>(path: string, data: any): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(path, data);
    return response.data;
  }

  /**
   * Makes a PUT request to the API
   * @param path - The API endpoint path
   * @param data - The data to send
   * @returns Promise with the API response
   */
  protected async put<T>(path: string, data: any): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(path, data);
    return response.data;
  }

  /**
   * Makes a DELETE request to the API
   * @param path - The API endpoint path
   * @returns Promise with the API response
   */
  protected async delete<T>(path: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(path);
    return response.data;
  }

  /**
   * Makes a PATCH request to the API
   * @param path - The API endpoint path
   * @param data - The data to send
   * @returns Promise with the API response
   */
  protected async patch<T>(path: string, data: any): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(path, data);
    return response.data;
  }
} 