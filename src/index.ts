import { ConvoyConfig } from './types';
import { ServerEndpoints } from './endpoints/server';
import { LocationEndpoints } from './endpoints/location';
import { NodeEndpoints } from './endpoints/node';
import { NodeAddressEndpoints } from './endpoints/node-address';
import { IpamEndpoints } from './endpoints/ipam';
import { UserEndpoints } from './endpoints/user';
import { TemplateEndpoints } from './endpoints/template';
import { BackupEndpoints } from './endpoints/backup';
import { ConvoyClient } from './client/ConvoyClient';
import { ApiResponse } from './types';

export * from './types';
export * from './types/server';
export * from './types/location';
export * from './types/node';
export * from './types/node-address';
export * from './types/ipam';
export * from './types/user';
export * from './types/template';
export * from './client/ConvoyClient';
export * from './endpoints/server';
export * from './endpoints/location';
export * from './endpoints/node';
export * from './endpoints/node-address';
export * from './endpoints/ipam';
export * from './endpoints/user';
export * from './endpoints/template';
export * from './endpoints/backup';

/**
 * Main Convoy client class
 */
export class Convoy {
  public readonly servers: ServerEndpoints;
  public readonly locations: LocationEndpoints;
  public readonly nodes: NodeEndpoints;
  public readonly nodeAddresses: NodeAddressEndpoints;
  public readonly ipam: IpamEndpoints;
  public readonly users: UserEndpoints;
  public readonly templates: TemplateEndpoints;
  public readonly api: {
    get: <T>(path: string, params?: Record<string, any>) => Promise<ApiResponse<T>>;
    post: <T>(path: string, data: any) => Promise<ApiResponse<T>>;
    put: <T>(path: string, data: any) => Promise<ApiResponse<T>>;
    delete: <T>(path: string) => Promise<ApiResponse<T>>;
    patch: <T>(path: string, data: any) => Promise<ApiResponse<T>>;
  };

  /**
   * Creates a new instance of the Convoy client
   * @param config - The configuration for the client
   */
  constructor(config: ConvoyConfig) {
    const client = new ConvoyClient(config);
    this.servers = new ServerEndpoints(config);
    this.locations = new LocationEndpoints(config);
    this.nodes = new NodeEndpoints(config);
    this.nodeAddresses = new NodeAddressEndpoints(config);
    this.ipam = new IpamEndpoints(config);
    this.users = new UserEndpoints(config);
    this.templates = new TemplateEndpoints(config);
    
    // Expose the HTTP methods through the api property
    this.api = {
      get: (path, params) => client.get(path, params),
      post: (path, data) => client.post(path, data),
      put: (path, data) => client.put(path, data),
      delete: (path) => client.delete(path),
      patch: (path, data) => client.patch(path, data),
    };
  }
}

// Export a default instance creator
export default function createConvoy(config: ConvoyConfig): Convoy {
  return new Convoy(config);
} 