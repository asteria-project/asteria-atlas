/**
 * The <code>ProcessTemplate</code> interface represents an Asteria process reference in the Atlas app.
 */
export interface ProcessTemplate {

    /**
     * The Unique Identifier for this process reference.
     */
    id: string;
    
    /**
     * The name of the process associated with this process reference.
     */
    name: string;
    
    /**
     * The reference to the config component associated with this process reference.
     */
    compRef: string;
}
