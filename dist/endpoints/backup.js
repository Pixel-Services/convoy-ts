"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupEndpoints = exports.BackupMode = exports.BackupCompressionType = void 0;
const ConvoyClient_1 = require("../client/ConvoyClient");
var BackupCompressionType;
(function (BackupCompressionType) {
    BackupCompressionType["ZSTD"] = "zstd";
    BackupCompressionType["GZIP"] = "gzip";
    BackupCompressionType["LZO"] = "lzo";
    BackupCompressionType["NONE"] = "none";
})(BackupCompressionType || (exports.BackupCompressionType = BackupCompressionType = {}));
var BackupMode;
(function (BackupMode) {
    BackupMode["SNAPSHOT"] = "snapshot";
    BackupMode["SUSPEND"] = "suspend";
    BackupMode["KILL"] = "kill";
})(BackupMode || (exports.BackupMode = BackupMode = {}));
/**
 * Backup endpoints implementation
 */
class BackupEndpoints extends ConvoyClient_1.ConvoyClient {
    constructor(config, serverUuid) {
        super(config);
        this.serverUuid = serverUuid;
    }
    async getBackup(uuid) {
        const response = await this.get(`/api/client/servers/${this.serverUuid}/backups/${uuid}`);
        return {
            ...response.data,
            restore: async () => {
                await this.post(`/api/client/servers/${this.serverUuid}/backups/${uuid}/restore`, {});
            },
            delete: async () => {
                await this.delete(`/api/client/servers/${this.serverUuid}/backups/${uuid}`);
            }
        };
    }
    /**
     * List backups for a server
     * @returns Promise with list of backups
     */
    async listBackups() {
        const response = await this.get(`/api/client/servers/${this.serverUuid}/backups`);
        return response.data.map((backup) => ({
            ...backup,
            restore: async () => {
                await this.post(`/api/client/servers/${this.serverUuid}/backups/${backup.uuid}/restore`, {});
            },
            delete: async () => {
                await this.delete(`/api/client/servers/${this.serverUuid}/backups/${backup.uuid}`);
            }
        }));
    }
    /**
     * Create a new backup for the server
     * @param params Backup creation parameters
     * @returns Promise with the created backup
     */
    async createBackup(params) {
        const response = await this.post(`/api/client/servers/${this.serverUuid}/backups`, params);
        return {
            ...response.data,
            restore: async () => {
                await this.post(`/api/client/servers/${this.serverUuid}/backups/${response.data.uuid}/restore`, {});
            },
            delete: async () => {
                await this.delete(`/api/client/servers/${this.serverUuid}/backups/${response.data.uuid}`);
            }
        };
    }
}
exports.BackupEndpoints = BackupEndpoints;
//# sourceMappingURL=backup.js.map