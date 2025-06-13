import { ConvoyConfig } from './types';
import { ServerEndpoints } from './endpoints/server';
import { LocationEndpoints } from './endpoints/location';
import { NodeEndpoints } from './endpoints/node';
import { NodeAddressEndpoints } from './endpoints/node-address';
import { IpamEndpoints } from './endpoints/ipam';
import { UserEndpoints } from './endpoints/user';
import { TemplateEndpoints } from './endpoints/template';

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

import { ConvoyClient } from './client/ConvoyClient';

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

  /**
   * Creates a new instance of the Convoy client
   * @param config - The configuration for the client
   */
  constructor(config: ConvoyConfig) {
    this.servers = new ServerEndpoints(config);
    this.locations = new LocationEndpoints(config);
    this.nodes = new NodeEndpoints(config);
    this.nodeAddresses = new NodeAddressEndpoints(config);
    this.ipam = new IpamEndpoints(config);
    this.users = new UserEndpoints(config);
    this.templates = new TemplateEndpoints(config);
  }
}

// Export a default instance creator
export default function createConvoy(config: ConvoyConfig): Convoy {
  return new Convoy(config);
} 