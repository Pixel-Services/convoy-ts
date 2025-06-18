import { ConvoyClient } from '../client/ConvoyClient';
import { buildListParams } from '../utils/filters';
import { ConvoyConfig } from '../types';

export enum BackupCompressionType {
  ZSTD = 'zstd',
  GZIP = 'gzip',
  LZO = 'lzo',
  NONE = 'none'
}

export enum BackupMode {
  SNAPSHOT = 'snapshot',
  SUSPEND = 'suspend',
  KILL = 'kill'
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
export class BackupEndpoints extends ConvoyClient {
  private readonly serverUuid: string;

  constructor(config: ConvoyConfig, serverUuid: string) {
    super(config);
    this.serverUuid = serverUuid;
  }

  async getBackup(uuid: string): Promise<Backup> {
    const response = await this.get<any>(
      `/api/client/servers/${this.serverUuid}/backups/${uuid}`
    );

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
  async listBackups(): Promise<Backup[]> {
    const response = await this.get<any>(
      `/api/client/servers/${this.serverUuid}/backups`
    );
    return response.data.map((backup: any) => ({
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
  async createBackup(params: CreateBackupParams): Promise<Backup> {
    const response = await this.post<Backup>(
      `/api/client/servers/${this.serverUuid}/backups`,
      params
    );

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