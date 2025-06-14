"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationEndpoints = void 0;
const ConvoyClient_1 = require("../client/ConvoyClient");
const filters_1 = require("../utils/filters");
/**
 * Location endpoints implementation
 */
class LocationEndpoints extends ConvoyClient_1.ConvoyClient {
    /**
     * List all locations
     * @param params - Optional filtering and pagination parameters
     * @returns Promise with list of locations
     */
    async listLocations(params) {
        const response = await this.get('/api/application/locations', (0, filters_1.buildListParams)(params));
        return response.data;
    }
}
exports.LocationEndpoints = LocationEndpoints;
//# sourceMappingURL=location.js.map