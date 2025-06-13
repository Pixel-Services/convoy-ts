import { describe, it, expect } from 'vitest';
import createConvoy from '../src';
import { testServerUuid } from './setup';

describe('Server API', () => {
  const convoy = createConvoy({
    baseUrl: process.env.CONVOY_URL || 'http://localhost',
    token: process.env.CONVOY_TOKEN || '',
  });

  it('should list servers', async () => {
    const servers = await convoy.servers.listServers({
      page: 1,
      per_page: 10,
      filter: {
        name: 'test-server',
      },
    });
    expect(servers).toBeDefined();
    expect(Array.isArray(servers)).toBe(true);
  });

  it('should get server details', async () => {
    const server = await convoy.servers.getServer(testServerUuid);
    expect(server).toBeDefined();
    expect(server.uuid).toBe(testServerUuid);
  });

  it('should update server', async () => {
    const updatedServer = await convoy.servers.updateServer(testServerUuid, {
      name: 'test-server-updated',
      hostname: 'updated.example.com',
    });
    expect(updatedServer).toBeDefined();
    expect(updatedServer.name).toBe('test-server-updated');
  });

  it('should update server build', async () => {
    const updatedBuild = await convoy.servers.updateServerBuild(testServerUuid, {
      cpu: 2,
      memory: 2147483648, // 2GB
      disk: 21474836480, // 20GB
    });
    expect(updatedBuild).toBeDefined();
    expect(updatedBuild.limits.cpu).toBe(2);
  });

  it('should perform server operations', async () => {
    // Suspend server
    await convoy.servers.suspendServer(testServerUuid);
    let server = await convoy.servers.getServer(testServerUuid);
    expect(server.status).toBe('suspended');

    // Unsuspend server
    await convoy.servers.unsuspendServer(testServerUuid);
    server = await convoy.servers.getServer(testServerUuid);
    expect(server.status).not.toBe('suspended');
  });
}); 