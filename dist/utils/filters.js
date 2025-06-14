"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFilterParams = buildFilterParams;
exports.buildListParams = buildListParams;
/**
 * Converts a filter object into URL query parameters
 * @param filters - The filter object to convert
 * @returns Object with filter parameters
 */
function buildFilterParams(filters) {
    if (!filters) {
        return {};
    }
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            // Handle wildcard filter specially
            if (key === '*') {
                params['filter[*]'] = value;
            }
            else {
                params[`filter[${key}]`] = value.toString();
            }
        }
    });
    return params;
}
/**
 * Builds query parameters for list endpoints
 * @param params - The parameters to build
 * @returns Object with query parameters
 */
function buildListParams(params) {
    if (!params) {
        return {};
    }
    const queryParams = {};
    if (params.page !== undefined) {
        queryParams.page = params.page.toString();
    }
    if (params.per_page !== undefined) {
        queryParams.per_page = params.per_page.toString();
    }
    return {
        ...queryParams,
        ...buildFilterParams(params.filter),
    };
}
//# sourceMappingURL=filters.js.map