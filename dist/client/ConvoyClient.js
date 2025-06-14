"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvoyClient = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Main client class for interacting with the Convoy API
 */
class ConvoyClient {
    /**
     * Creates a new instance of the Convoy client
     * @param config - The configuration for the client
     */
    constructor(config) {
        this.config = config;
        this.client = axios_1.default.create({
            baseURL: config.baseUrl,
            timeout: config.timeout || 30000,
            headers: {
                'Authorization': `Bearer ${config.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        // Add response interceptor for error handling
        this.client.interceptors.response.use((response) => response, (error) => {
            if (error.response) {
                const apiError = {
                    message: error.response.data.message || 'An error occurred',
                    errors: error.response.data.errors,
                    status: error.response.status,
                };
                return Promise.reject(apiError);
            }
            return Promise.reject(error);
        });
    }
    /**
     * Makes a GET request to the API
     * @param path - The API endpoint path
     * @param params - Optional query parameters
     * @returns Promise with the API response
     */
    async get(path, params) {
        const response = await this.client.get(path, { params });
        return response.data;
    }
    /**
     * Makes a POST request to the API
     * @param path - The API endpoint path
     * @param data - The data to send
     * @returns Promise with the API response
     */
    async post(path, data) {
        const response = await this.client.post(path, data);
        return response.data;
    }
    /**
     * Makes a PUT request to the API
     * @param path - The API endpoint path
     * @param data - The data to send
     * @returns Promise with the API response
     */
    async put(path, data) {
        const response = await this.client.put(path, data);
        return response.data;
    }
    /**
     * Makes a DELETE request to the API
     * @param path - The API endpoint path
     * @returns Promise with the API response
     */
    async delete(path) {
        const response = await this.client.delete(path);
        return response.data;
    }
    /**
     * Makes a PATCH request to the API
     * @param path - The API endpoint path
     * @param data - The data to send
     * @returns Promise with the API response
     */
    async patch(path, data) {
        const response = await this.client.patch(path, data);
        return response.data;
    }
}
exports.ConvoyClient = ConvoyClient;
//# sourceMappingURL=ConvoyClient.js.map