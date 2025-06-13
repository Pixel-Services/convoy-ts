import { ConvoyClient } from '../client/ConvoyClient';
import { Template, TemplateGroup, TemplateGroupsResponse } from '../types/template';

/**
 * Endpoints for managing templates
 * 
 * Important Note: When creating servers, use the template's UUID (from the templates array)
 * and NOT the template group's UUID. The template group UUID is for organizational purposes only.
 */
export class TemplateEndpoints extends ConvoyClient {
  /**
   * Get all template groups and their templates for a specific node
   * @param nodeId - The ID of the node to get templates for
   * @returns Promise with array of template groups and their templates
   * 
   * Note: When using these templates for server creation, use the template's UUID
   * (from the templates array) and NOT the template group's UUID.
   */
  async getNodeTemplates(nodeId: number): Promise<TemplateGroup[]> {
    const response = await this.get<TemplateGroupsResponse>(`/api/application/nodes/${nodeId}/template-groups`);
    return response.data.data;
  }

  /**
   * Helper method to find a specific template by name within a node's templates
   * @param nodeId - The ID of the node to search in
   * @param templateName - The name of the template to find
   * @returns Promise with the found template or undefined if not found
   */
  async findTemplateByName(nodeId: number, templateName: string): Promise<Template | undefined> {
    const templateGroups = await this.getNodeTemplates(nodeId);
    
    for (const group of templateGroups) {
      const template = group.templates.data.find(t => t.name === templateName);
      if (template) {
        return template;
      }
    }
    
    return undefined;
  }

  /**
   * Helper method to find a specific template by UUID within a node's templates
   * @param nodeId - The ID of the node to search in
   * @param templateUuid - The UUID of the template to find
   * @returns Promise with the found template or undefined if not found
   */
  async findTemplateByUuid(nodeId: number, templateUuid: string): Promise<Template | undefined> {
    const templateGroups = await this.getNodeTemplates(nodeId);
    
    for (const group of templateGroups) {
      const template = group.templates.data.find(t => t.uuid === templateUuid);
      if (template) {
        return template;
      }
    }
    
    return undefined;
  }
} 