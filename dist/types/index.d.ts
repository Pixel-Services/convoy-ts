/**
 * Base configuration for the Convoy client
 */
export interface ConvoyConfig {
    /** The base URL of the Convoy API */
    baseUrl: string;
    /** The API token for authentication */
    token: string;
    /** Optional timeout in milliseconds for API requests */
    timeout?: number;
}
/**
 * Base response interface for all API responses
 */
export interface ApiResponse<T> {
    data: T;
    meta?: {
        pagination?: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
        };
    };
}
/**
 * Base error response from the API
 */
export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    status: number;
}
/**
 * Pagination parameters for list endpoints
 */
export interface PaginationParams {
    page?: number;
    per_page?: number;
}
/**
 * Base parameters for filtering
 */
export interface FilterParams {
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
}
/**
 * Base parameters for all list endpoints
 */
export interface ListParams extends PaginationParams, FilterParams {
}
