import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Convoy } from '../src';
import { TEST_SERVER_CONFIG, createTestServer, cleanupTestServer } from './setup';

const convoy = new Convoy({
  baseUrl: process.env.CONVOY_URL || 'http://localhost',
  token: process.env.CONVOY_TOKEN || '',
});

describe('IPAM API', () => {
  let testPoolId: number;

  beforeAll(async () => {
    // Create a test address pool
    const pool = await convoy.ipam.createAddressPool({
      name: 'Test Pool',
      node_ids: [1],
    });
    testPoolId = pool.id;
  });

  afterAll(async () => {
    // Clean up the test pool
    await convoy.ipam.deleteAddressPool(testPoolId);
  });

  it('should list address pools', async () => {
    const pools = await convoy.ipam.listAddressPools({
      page: 1,
      per_page: 10,
      filter: {
        name: 'Test Pool',
      },
    });

    expect(pools).toBeDefined();
    expect(Array.isArray(pools)).toBe(true);
    expect(pools.length).toBeGreaterThan(0);
  });

  it('should get address pool details', async () => {
    const pool = await convoy.ipam.getAddressPool(testPoolId);

    expect(pool).toBeDefined();
    expect(pool.id).toBe(testPoolId);
    expect(pool.name).toBe('Test Pool');
  });

  it('should create and manage addresses in a pool', async () => {
    // Create a single address
    const address = await convoy.ipam.createPoolAddress(testPoolId, {
      is_bulk_action: false,
      mac_address: null,
      server_id: null,
      address: '172.16.141.71',
      type: 'ipv4',
      cidr: 24,
      gateway: '172.16.141.1',
    });

    expect(address).toBeDefined();
    expect(address.address).toBe('172.16.141.71');

    // List pool addresses
    const addresses = await convoy.ipam.listPoolAddresses(testPoolId, {
      page: 1,
      per_page: 10,
      filter: {
        type: 'ipv4',
        server_id: null,
      },
    });

    expect(addresses).toBeDefined();
    expect(Array.isArray(addresses)).toBe(true);
    expect(addresses.length).toBeGreaterThan(0);

    // Update the address
    const updatedAddress = await convoy.ipam.updatePoolAddress(testPoolId, address.id, {
      mac_address: null,
      server_id: null,
      address: '172.16.141.72',
      type: 'ipv4',
      cidr: 24,
      gateway: '172.16.141.1',
    });

    expect(updatedAddress).toBeDefined();
    expect(updatedAddress.address).toBe('172.16.141.72');

    // Delete the address
    await convoy.ipam.deletePoolAddress(testPoolId, address.id);
  });

  it('should create multiple addresses in bulk', async () => {
    await convoy.ipam.createPoolAddress(testPoolId, {
      is_bulk_action: true,
      starting_address: '172.16.141.80',
      ending_address: '172.16.141.85',
      mac_address: null,
      server_id: null,
      type: 'ipv4',
      cidr: 24,
      gateway: '172.16.141.1',
    });

    const addresses = await convoy.ipam.listPoolAddresses(testPoolId, {
      page: 1,
      per_page: 10,
      filter: {
        type: 'ipv4',
        server_id: null,
      },
    });

    expect(addresses).toBeDefined();
    expect(Array.isArray(addresses)).toBe(true);
    expect(addresses.length).toBeGreaterThanOrEqual(6);
  });

  it('should update address pool', async () => {
    const updatedPool = await convoy.ipam.updateAddressPool(testPoolId, {
      name: 'Updated Test Pool',
      node_ids: [1, 2],
    });

    expect(updatedPool).toBeDefined();
    expect(updatedPool.name).toBe('Updated Test Pool');
    expect(updatedPool.node_ids).toContain(2);
  });
}); 