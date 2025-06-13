import { describe, it, expect, beforeAll } from 'vitest';
import { Convoy } from '../src';

const convoy = new Convoy({
  baseUrl: process.env.CONVOY_URL || 'http://localhost',
  token: process.env.CONVOY_TOKEN || '',
});

describe('Node Address API', () => {
  let testNodeId: number;

  beforeAll(async () => {
    // Get a test node ID
    const nodes = await convoy.nodes.listNodes();
    if (nodes.length > 0) {
      testNodeId = nodes[0].id;
    } else {
      throw new Error('No nodes available for testing');
    }
  });

  it('should list node addresses', async () => {
    const addresses = await convoy.nodeAddresses.listNodeAddresses(testNodeId, {
      page: 1,
      per_page: 10,
      filter: {
        type: 'ipv4',
        server_id: null,
      },
    });

    expect(addresses).toBeDefined();
    expect(Array.isArray(addresses)).toBe(true);
  });

  it('should update node address', async () => {
    // First get an existing address
    const addresses = await convoy.nodeAddresses.listNodeAddresses(testNodeId);
    if (addresses.length > 0) {
      const address = addresses[0];
      
      // Update the address
      const updatedAddress = await convoy.nodeAddresses.updateNodeAddress(testNodeId, address.id, {
        mac_address: null,
        server_id: null,
        address: '172.16.141.72',
        type: 'ipv4',
        cidr: 24,
        gateway: '172.16.141.1',
      });

      expect(updatedAddress).toBeDefined();
      expect(updatedAddress.address).toBe('172.16.141.72');
    }
  });
}); 