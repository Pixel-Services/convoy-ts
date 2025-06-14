"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerImpl = exports.ConsoleType = exports.ServerType = exports.ServerStatus = void 0;
/**
 * Server status types
 */
var ServerStatus;
(function (ServerStatus) {
    ServerStatus["RUNNING"] = "running";
    ServerStatus["STOPPED"] = "stopped";
    ServerStatus["SUSPENDED"] = "suspended";
    ServerStatus["ERROR"] = "error";
    ServerStatus["INSTALLING"] = "installing";
})(ServerStatus || (exports.ServerStatus = ServerStatus = {}));
/**
 * Server type
 */
var ServerType;
(function (ServerType) {
    ServerType["KVM"] = "kvm";
    ServerType["LXC"] = "lxc";
})(ServerType || (exports.ServerType = ServerType = {}));
/**
 * Console session type
 */
var ConsoleType;
(function (ConsoleType) {
    ConsoleType["NOVNC"] = "novnc";
    ConsoleType["XTERMJS"] = "xtermjs";
})(ConsoleType || (exports.ConsoleType = ConsoleType = {}));
/**
 * Server implementation class that attaches methods to server objects
 */
class ServerImpl {
    constructor(data, client) {
        Object.assign(this, data);
        this.client = client;
    }
    async getState() {
        return this.client.getState(this.uuid);
    }
    async createConsoleSession(type) {
        return this.client.createConsoleSession(this.uuid, type);
    }
}
exports.ServerImpl = ServerImpl;
//# sourceMappingURL=server.js.map