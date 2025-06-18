import { PaginationMeta } from './common'
import { ConvoyClient } from '../client/ConvoyClient'

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

export class BackupImpl implements Backup {
  public readonly uuid: string;
  public readonly is_successful: number;
  public readonly is_locked: number;
  public readonly name: string;
  public readonly size: number | null;
  public readonly completed_at: string | null;
  public readonly created_at: string;
  private readonly client: ConvoyClient;
  private readonly serverUuid: string;

  constructor(data: Backup, client: ConvoyClient, serverUuid: string) {
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
  async restore(): Promise<void> {
    await this.client.post(`/api/client/servers/${this.serverUuid}/backups/${this.uuid}/restore`, {});
  }
} 