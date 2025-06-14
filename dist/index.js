"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convoy = void 0;
exports.default = createConvoy;
const server_1 = require("./endpoints/server");
const location_1 = require("./endpoints/location");
const node_1 = require("./endpoints/node");
const node_address_1 = require("./endpoints/node-address");
const ipam_1 = require("./endpoints/ipam");
const user_1 = require("./endpoints/user");
const template_1 = require("./endpoints/template");
__exportStar(require("./types"), exports);
__exportStar(require("./types/server"), exports);
__exportStar(require("./types/location"), exports);
__exportStar(require("./types/node"), exports);
__exportStar(require("./types/node-address"), exports);
__exportStar(require("./types/ipam"), exports);
__exportStar(require("./types/user"), exports);
__exportStar(require("./types/template"), exports);
__exportStar(require("./client/ConvoyClient"), exports);
__exportStar(require("./endpoints/server"), exports);
__exportStar(require("./endpoints/location"), exports);
__exportStar(require("./endpoints/node"), exports);
__exportStar(require("./endpoints/node-address"), exports);
__exportStar(require("./endpoints/ipam"), exports);
__exportStar(require("./endpoints/user"), exports);
__exportStar(require("./endpoints/template"), exports);
/**
 * Main Convoy client class
 */
class Convoy {
    /**
     * Creates a new instance of the Convoy client
     * @param config - The configuration for the client
     */
    constructor(config) {
        this.servers = new server_1.ServerEndpoints(config);
        this.locations = new location_1.LocationEndpoints(config);
        this.nodes = new node_1.NodeEndpoints(config);
        this.nodeAddresses = new node_address_1.NodeAddressEndpoints(config);
        this.ipam = new ipam_1.IpamEndpoints(config);
        this.users = new user_1.UserEndpoints(config);
        this.templates = new template_1.TemplateEndpoints(config);
    }
}
exports.Convoy = Convoy;
// Export a default instance creator
function createConvoy(config) {
    return new Convoy(config);
}
//# sourceMappingURL=index.js.map