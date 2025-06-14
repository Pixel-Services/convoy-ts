import { ConvoyClient } from '../client/ConvoyClient';
import { Template, TemplateGroup } from '../types/template';
/**
 * Endpoints for managing templates
 *
 * Important Note: When creating servers, use the template's UUID (from the templates array)
 * and NOT the template group's UUID. The template group UUID is for organizational purposes only.
 */
export declare class TemplateEndpoints extends ConvoyClient {
    /**
     * Get all template groups and their templates for a specific node
     * @param nodeId - The ID of the node to get templates for
     * @returns Promise with array of template groups and their templates
     *
     * Note: When using these templates for server creation, use the template's UUID
     * (from the templates array) and NOT the template group's UUID.
     */
    getNodeTemplates(nodeId: number): Promise<TemplateGroup[]>;
    /**
     * Helper method to find a specific template by name within a node's templates
     * @param nodeId - The ID of the node to search in
     * @param templateName - The name of the template to find
     * @returns Promise with the found template or undefined if not found
     */
    findTemplateByName(nodeId: number, templateName: string): Promise<Template | undefined>;
    /**
     * Helper method to find a specific template by UUID within a node's templates
     * @param nodeId - The ID of the node to search in
     * @param templateUuid - The UUID of the template to find
     * @returns Promise with the found template or undefined if not found
     */
    findTemplateByUuid(nodeId: number, templateUuid: string): Promise<Template | undefined>;
}
