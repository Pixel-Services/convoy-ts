/**
 * Converts a filter object into URL query parameters
 * @param filters - The filter object to convert
 * @returns Object with filter parameters
 */
export declare function buildFilterParams<T extends Record<string, any>>(filters?: T): Record<string, string>;
/**
 * Builds query parameters for list endpoints
 * @param params - The parameters to build
 * @returns Object with query parameters
 */
export declare function buildListParams<T extends Record<string, any>>(params?: {
    page?: number;
    per_page?: number;
    filter?: T;
}): Record<string, string>;
