"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerImpl = exports.ConsoleType = exports.ServerType = exports.ServerStateAction = exports.ServerStatus = void 0;
const backup_1 = require("../endpoints/backup");
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
 * Server state actions
 */
var ServerStateAction;
(function (ServerStateAction) {
    ServerStateAction["START"] = "start";
    ServerStateAction["RESTART"] = "restart";
    ServerStateAction["KILL"] = "kill";
    ServerStateAction["SHUTDOWN"] = "shutdown";
})(ServerStateAction || (exports.ServerStateAction = ServerStateAction = {}));
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
        this.backups = new backup_1.BackupEndpoints(client.getConfig(), this.uuid);
    }
    async getState() {
        return this.client.getState(this.uuid);
    }
    async createConsoleSession(type) {
        return this.client.createConsoleSession(this.uuid, type);
    }
    async reinstall(params) {
        await this.client.reinstall(this.uuid, params);
    }
    async start() {
        await this.client.start(this.uuid);
    }
    async restart() {
        await this.client.restart(this.uuid);
    }
    async kill() {
        await this.client.kill(this.uuid);
    }
    async shutdown() {
        await this.client.shutdown(this.uuid);
    }
    async changeName(newName) {
        await this.client.rename(this.uuid, { name: newName, hostname: this.hostname });
    }
    async changeHostname(newHostname) {
        await this.client.rename(this.uuid, { name: this.name, hostname: newHostname });
    }
}
exports.ServerImpl = ServerImpl;
//# sourceMappingURL=server.js.map