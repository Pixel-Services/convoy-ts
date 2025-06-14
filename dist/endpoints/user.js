"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEndpoints = void 0;
const ConvoyClient_1 = require("../client/ConvoyClient");
const filters_1 = require("../utils/filters");
/**
 * Endpoints for managing users
 */
class UserEndpoints extends ConvoyClient_1.ConvoyClient {
    /**
     * List all users with optional filtering and pagination
     * @param params - Optional parameters for filtering and pagination
     * @returns Promise with array of users
     */
    async listUsers(params) {
        const response = await this.get('/api/application/users', (0, filters_1.buildListParams)(params));
        return response.data;
    }
    /**
     * Get a specific user by ID
     * @param id - The ID of the user to retrieve
     * @returns Promise with user data
     */
    async getUser(id) {
        const response = await this.get(`/api/application/users/${id}`);
        return response.data;
    }
    /**
     * Create a new user
     * @param data - The user data to create
     * @returns Promise with created user data
     */
    async createUser(data) {
        const response = await this.post('/api/application/users', data);
        return response.data;
    }
    /**
     * Update an existing user
     * @param id - The ID of the user to update
     * @param data - The user data to update
     * @returns Promise with updated user data
     */
    async updateUser(id, data) {
        const response = await this.put(`/api/application/users/${id}`, data);
        return response.data;
    }
    /**
     * Delete a user
     * @param id - The ID of the user to delete
     * @returns Promise that resolves when the user is deleted
     * @throws Error if the user has associated servers
     */
    async deleteUser(id) {
        await this.delete(`/api/application/users/${id}`);
    }
}
exports.UserEndpoints = UserEndpoints;
//# sourceMappingURL=user.js.map