import { ConvoyClient } from '../client/ConvoyClient';
import { User, UserListParams, CreateUserRequest, UpdateUserRequest } from '../types/user';
import { buildListParams } from '../utils/filters';

/**
 * Endpoints for managing users
 */
export class UserEndpoints extends ConvoyClient {
  /**
   * List all users with optional filtering and pagination
   * @param params - Optional parameters for filtering and pagination
   * @returns Promise with array of users
   */
  async listUsers(params?: UserListParams): Promise<User[]> {
    const response = await this.get<User[]>('/api/application/users', buildListParams(params));
    return response.data;
  }

  /**
   * Get a specific user by ID
   * @param id - The ID of the user to retrieve
   * @returns Promise with user data
   */
  async getUser(id: number): Promise<User> {
    const response = await this.get<User>(`/api/application/users/${id}`);
    return response.data;
  }

  /**
   * Create a new user
   * @param data - The user data to create
   * @returns Promise with created user data
   */
  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await this.post<User>('/api/application/users', data);
    return response.data;
  }

  /**
   * Update an existing user
   * @param id - The ID of the user to update
   * @param data - The user data to update
   * @returns Promise with updated user data
   */
  async updateUser(id: number, data: UpdateUserRequest): Promise<User> {
    const response = await this.put<User>(`/api/application/users/${id}`, data);
    return response.data;
  }

  /**
   * Delete a user
   * @param id - The ID of the user to delete
   * @returns Promise that resolves when the user is deleted
   * @throws Error if the user has associated servers
   */
  async deleteUser(id: number): Promise<void> {
    await this.delete(`/api/application/users/${id}`);
  }
} 