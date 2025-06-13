/**
 * Represents a user in the system
 */
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  root_admin: boolean;
  servers_count: number;
}

/**
 * Parameters for filtering users
 */
export interface UserFilters {
  name?: string;
  id?: number;
  email?: string;
}

/**
 * Parameters for listing users
 */
export interface UserListParams {
  page?: number;
  per_page?: number;
  filter?: UserFilters;
}

/**
 * Request payload for creating a user
 */
export interface CreateUserRequest {
  root_admin: boolean;
  name: string;
  email: string;
  password: string;
}

/**
 * Request payload for updating a user
 */
export interface UpdateUserRequest {
  root_admin?: boolean;
  name?: string;
  email?: string;
  password?: string | null;
} 