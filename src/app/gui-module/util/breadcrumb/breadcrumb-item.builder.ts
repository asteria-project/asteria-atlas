import { BreadcrumbItem } from './breadcrumb-item.model';

/**
 * A static builder for creating new breadcrumb items.
 */
export class BreadcrumbItemBuilder {

    /**
     * Return a new breadcrumb item.
     * 
     * @param {string} label the label for the new breadcrumb item.
     * @param {string} route route for the new breadcrumb item.
     * 
     * @returns {BreadcrumbItem} a new breadcrumb item.
     */
    public static build(label: string, route?: string): BreadcrumbItem {
        return {
            label: label, 
            route: route
        };
    }
}