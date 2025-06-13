import { describe, it, expect } from 'vitest';
import createConvoy from '../src';

describe('Template API', () => {
  const convoy = createConvoy({
    baseUrl: process.env.CONVOY_URL || 'http://localhost',
    token: process.env.CONVOY_TOKEN || '',
  });

  const TEST_NODE_ID = 1; // Replace with your test node ID

  it('should get node templates', async () => {
    const templateGroups = await convoy.templates.getNodeTemplates(TEST_NODE_ID);
    expect(templateGroups).toBeDefined();
    expect(Array.isArray(templateGroups)).toBe(true);
    expect(templateGroups.length).toBeGreaterThan(0);
  });

  it('should find template by name', async () => {
    const template = await convoy.templates.findTemplateByName(TEST_NODE_ID, '20.04');
    expect(template).toBeDefined();
    expect(template?.name).toBe('20.04');
  });

  it('should find template by UUID', async () => {
    // First get a template to use its UUID
    const templateGroups = await convoy.templates.getNodeTemplates(TEST_NODE_ID);
    const template = templateGroups[0]?.templates.data[0];
    expect(template).toBeDefined();

    if (template) {
      const foundTemplate = await convoy.templates.findTemplateByUuid(TEST_NODE_ID, template.uuid);
      expect(foundTemplate).toBeDefined();
      expect(foundTemplate?.uuid).toBe(template.uuid);
    }
  });

  it('should handle non-existent template gracefully', async () => {
    const template = await convoy.templates.findTemplateByName(TEST_NODE_ID, 'non-existent-template');
    expect(template).toBeUndefined();
  });
}); 