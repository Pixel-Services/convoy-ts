import { describe, it, expect } from 'vitest';
import { Convoy } from '../src';

const convoy = new Convoy({
  baseUrl: process.env.CONVOY_URL || 'http://localhost',
  token: process.env.CONVOY_TOKEN || '',
});

describe('Node API', () => {
  it('should list nodes', async () => {
    const nodes = await convoy.nodes.listNodes({
      page: 1,
      per_page: 10,
    });

    expect(nodes).toBeDefined();
    expect(Array.isArray(nodes)).toBe(true);
    expect(nodes.length).toBeGreaterThan(0);
  });

  it('should list nodes with filters', async () => {
    const nodes = await convoy.nodes.listNodes({
      page: 1,
      per_page: 10,
      filter: {
        name: 'us-southeast',
        location_id: 5340,
      },
    });

    expect(nodes).toBeDefined();
    expect(Array.isArray(nodes)).toBe(true);
    if (nodes.length > 0) {
      expect(nodes[0].name).toContain('us-southeast');
    }
  });

  it('should get node details', async () => {
    const nodes = await convoy.nodes.listNodes();
    if (nodes.length > 0) {
      const node = await convoy.nodes.getNode(nodes[0].id);

      expect(node).toBeDefined();
      expect(node.id).toBe(nodes[0].id);
    }
  });
}); 