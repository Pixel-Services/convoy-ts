/**
 * Location model
 */
export interface Location {
    id: number;
    description: string;
    short_code: string;
    nodes_count: number;
    servers_count: number;
}
/**
 * Parameters for filtering locations
 */
export interface LocationFilters {
    short_code?: string;
    description?: string;
}
/**
 * Location list parameters
 */
export interface LocationListParams {
    search?: string;
    page?: number;
    per_page?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    filter?: LocationFilters;
}
