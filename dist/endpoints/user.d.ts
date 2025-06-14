import { ConvoyClient } from '../client/ConvoyClient';
import { User, UserListParams, CreateUserRequest, UpdateUserRequest } from '../types/user';
/**
 * Endpoints for managing users
 */
export declare class UserEndpoints extends ConvoyClient {
    /**
     * List all users with optional filtering and pagination
     * @param params - Optional parameters for filtering and pagination
     * @returns Promise with array of users
     */
    listUsers(params?: UserListParams): Promise<User[]>;
    /**
     * Get a specific user by ID
     * @param id - The ID of the user to retrieve
     * @returns Promise with user data
     */
    getUser(id: number): Promise<User>;
    /**
     * Create a new user
     * @param data - The user data to create
     * @returns Promise with created user data
     */
    createUser(data: CreateUserRequest): Promise<User>;
    /**
     * Update an existing user
     * @param id - The ID of the user to update
     * @param data - The user data to update
     * @returns Promise with updated user data
     */
    updateUser(id: number, data: UpdateUserRequest): Promise<User>;
    /**
     * Delete a user
     * @param id - The ID of the user to delete
     * @returns Promise that resolves when the user is deleted
     * @throws Error if the user has associated servers
     */
    deleteUser(id: number): Promise<void>;
}
