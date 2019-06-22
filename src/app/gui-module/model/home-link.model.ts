/**
 * The <code>HomeLink</code> interface defines the a link displayed in a module Home Page.
 */
export interface HomeLink {

    /**
     * The link title text.
     */
    title: string;

    /**
     * The link icon.
     */
    icon: string;

    /**
     * The route associated with this link.
     */
    routerLink: string;

    /**
     * The description for this link.
     */
    description: string;
}
