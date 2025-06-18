import { ConvoyConfig } from './types';
import { ServerEndpoints } from './endpoints/server';
import { LocationEndpoints } from './endpoints/location';
import { NodeEndpoints } from './endpoints/node';
import { NodeAddressEndpoints } from './endpoints/node-address';
import { IpamEndpoints } from './endpoints/ipam';
import { UserEndpoints } from './endpoints/user';
import { TemplateEndpoints } from './endpoints/template';
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
export declare class Convoy {
    readonly servers: ServerEndpoints;
    readonly locations: LocationEndpoints;
    readonly nodes: NodeEndpoints;
    readonly nodeAddresses: NodeAddressEndpoints;
    readonly ipam: IpamEndpoints;
    readonly users: UserEndpoints;
    readonly templates: TemplateEndpoints;
    readonly api: {
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
    constructor(config: ConvoyConfig);
}
export default function createConvoy(config: ConvoyConfig): Convoy;
