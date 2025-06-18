import { PaginationMeta } from './common';
import { ConvoyClient } from '../client/ConvoyClient';
export interface Backup {
    uuid: string;
    is_successful: number;
    is_locked: number;
    name: string;
    size: number | null;
    completed_at: string | null;
    created_at: string;
}
export interface BackupListResponse {
    data: Backup[];
    meta: {
        backup_count: number;
        pagination: PaginationMeta;
    };
}
export interface BackupListParams {
    per_page?: number;
    page?: number;
}
export declare class BackupImpl implements Backup {
    readonly uuid: string;
    readonly is_successful: number;
    readonly is_locked: number;
    readonly name: string;
    readonly size: number | null;
    readonly completed_at: string | null;
    readonly created_at: string;
    private readonly client;
    private readonly serverUuid;
    constructor(data: Backup, client: ConvoyClient, serverUuid: string);
    /**
     * Restore this backup
     * @returns Promise that resolves when the restore is complete
     */
    restore(): Promise<void>;
}
