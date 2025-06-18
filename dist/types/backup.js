"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupImpl = void 0;
class BackupImpl {
    constructor(data, client, serverUuid) {
        this.uuid = data.uuid;
        this.is_successful = data.is_successful;
        this.is_locked = data.is_locked;
        this.name = data.name;
        this.size = data.size;
        this.completed_at = data.completed_at;
        this.created_at = data.created_at;
        this.client = client;
        this.serverUuid = serverUuid;
    }
    /**
     * Restore this backup
     * @returns Promise that resolves when the restore is complete
     */
    async restore() {
        await this.client.post(`/api/client/servers/${this.serverUuid}/backups/${this.uuid}/restore`, {});
    }
}
exports.BackupImpl = BackupImpl;
//# sourceMappingURL=backup.js.map