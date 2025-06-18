export interface PaginationMeta {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: Record<string, string>;
}
