import { beforeAll, afterAll } from 'vitest';
import createConvoy from '../src';
import { Server } from '../src/types/server';
import { Convoy } from '../src';
import { CreateServerRequest } from '../src/types/server';

// Test server configuration
export const TEST_SERVER_CONFIG: CreateServerRequest = {
  node_id: 1,
  user_id: 1,
  name: 'test-server',
  hostname: 'test.example.com',
  vmid: null,
  limits: {
    cpu: 2,
    memory: 4294967296, // 4GB
    disk: 5368709120, // 5GB
    snapshots: 0,
    backups: null,
    bandwidth: null,
    address_ids: [],
  },
  account_password: 'test123!',
  should_create_server: true,
  template_uuid: 'template-uuid-here',
  start_on_completion: false,
};

// Shared test resources
export let testServer: Server;
export let testServerUuid: string;

// Initialize test environment
beforeAll(async () => {
  const convoy = createConvoy({
    baseUrl: process.env.CONVOY_URL || 'http://localhost',
    token: process.env.CONVOY_TOKEN || '',
  });

  // Get a template UUID for testing
  const templates = await convoy.templates.getNodeTemplates(TEST_SERVER_CONFIG.node_id);
  const template = templates[0]?.templates.data[0];
  if (!template) {
    throw new Error('No templates found for testing');
  }
  TEST_SERVER_CONFIG.template_uuid = template.uuid;

  // Create test server
  testServer = await convoy.servers.createServer(TEST_SERVER_CONFIG);
  testServerUuid = testServer.uuid;

  // Wait for server to be ready
  let serverStatus = await convoy.servers.getServer(testServerUuid);
  while (serverStatus.status === 'installing') {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
    serverStatus = await convoy.servers.getServer(testServerUuid);
  }
});

// Cleanup test environment
afterAll(async () => {
  const convoy = createConvoy({
    baseUrl: process.env.CONVOY_URL || 'http://localhost',
    token: process.env.CONVOY_TOKEN || '',
  });

  // Delete test server
  if (testServerUuid) {
    await convoy.servers.deleteServer(testServerUuid, { no_purge: true });
  }
});

const convoy = new Convoy({
  baseUrl: process.env.CONVOY_URL || 'http://localhost',
  token: process.env.CONVOY_TOKEN || '',
});

export async function createTestServer() {
  const server = await convoy.servers.createServer(TEST_SERVER_CONFIG);
  return server;
}

export async function cleanupTestServer(serverId: string) {
  await convoy.servers.deleteServer(serverId, { no_purge: true });
}

export async function waitForServerReady(serverId: string, timeout = 30000): Promise<void> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const server = await convoy.servers.getServer(serverId);
    if (server.status === 'running') {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error(`Server ${serverId} did not become ready within ${timeout}ms`);
} 