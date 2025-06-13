/**
 * Converts a filter object into URL query parameters
 * @param filters - The filter object to convert
 * @returns Object with filter parameters
 */
export function buildFilterParams<T extends Record<string, any>>(filters?: T): Record<string, string> {
  if (!filters) {
    return {};
  }

  const params: Record<string, string> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Handle wildcard filter specially
      if (key === '*') {
        params['filter[*]'] = value;
      } else {
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
export function buildListParams<T extends Record<string, any>>(params?: { page?: number; per_page?: number; filter?: T; }): Record<string, string> {
  if (!params) {
    return {};
  }

  const queryParams: Record<string, string> = {};

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