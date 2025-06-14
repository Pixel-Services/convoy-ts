/**
 * Represents a template within a template group
 */
export interface Template {
    id: number;
    template_group_id: number;
    uuid: string;
    name: string;
    vmid: number;
    hidden: number;
    order_column: number;
}
/**
 * Represents a template group containing multiple templates
 */
export interface TemplateGroup {
    id: number;
    node_id: number;
    uuid: string;
    name: string;
    hidden: number;
    order_column: number;
    templates: {
        data: Template[];
    };
}
/**
 * Response type for template groups endpoint
 */
export interface TemplateGroupsResponse {
    data: TemplateGroup[];
}
