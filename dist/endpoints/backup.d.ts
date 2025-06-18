import { ConvoyClient } from '../client/ConvoyClient';
import { ConvoyConfig } from '../types';
export declare enum BackupCompressionType {
    ZSTD = "zstd",
    GZIP = "gzip",
    LZO = "lzo",
    NONE = "none"
}
export declare enum BackupMode {
    SNAPSHOT = "snapshot",
    SUSPEND = "suspend",
    KILL = "kill"
}
interface Backup {
    uuid: string;
    name: string;
    restore(): Promise<void>;
    delete(): Promise<void>;
}
interface CreateBackupParams {
    compression_type: BackupCompressionType;
    locked: boolean;
    mode: BackupMode;
    name: string;
}
/**
 * Backup endpoints implementation
 */
export declare class BackupEndpoints extends ConvoyClient {
    private readonly serverUuid;
    constructor(config: ConvoyConfig, serverUuid: string);
    getBackup(uuid: string): Promise<Backup>;
    /**
     * List backups for a server
     * @returns Promise with list of backups
     */
    listBackups(): Promise<Backup[]>;
    /**
     * Create a new backup for the server
     * @param params Backup creation parameters
     * @returns Promise with the created backup
     */
    createBackup(params: CreateBackupParams): Promise<Backup>;
}
export {};
