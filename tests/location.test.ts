import { describe, it, expect } from 'vitest';
import { Convoy } from '../src';

const convoy = new Convoy({
  baseUrl: process.env.CONVOY_URL || 'http://localhost',
  token: process.env.CONVOY_TOKEN || '',
});

describe('Location API', () => {
  it('should list locations', async () => {
    const locations = await convoy.locations.listLocations({
      page: 1,
      per_page: 10,
    });

    expect(locations).toBeDefined();
    expect(Array.isArray(locations)).toBe(true);
    expect(locations.length).toBeGreaterThan(0);
  });

  it('should list locations with filters', async () => {
    const locations = await convoy.locations.listLocations({
      page: 1,
      per_page: 10,
      filter: {
        short_code: 'us-southeast',
      },
    });

    expect(locations).toBeDefined();
    expect(Array.isArray(locations)).toBe(true);
    if (locations.length > 0) {
      expect(locations[0].short_code).toContain('us-southeast');
    }
  });
}); 