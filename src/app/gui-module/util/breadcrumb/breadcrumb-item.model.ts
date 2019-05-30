/**
 * The <code>BreadcrumbItem</code> interface represents an item of the Atlas app breadcrumb.
 */
export interface BreadcrumbItem {

    /**
     * The label for the associated breadcrumb item.
     */
    label: string;

    /**
     * The route for the associated breadcrumb item.
     */
    route?: string;
}