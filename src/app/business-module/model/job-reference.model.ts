/**
 * The <code>JobReference</code> interface contains information about jobs in the Atlas app.
 */
export interface JobReference {

    /**
     * The Unique Identifier for this job reference.
     */
    id: string;
    
    /**
     * The name of the job associated with this job reference.
     */
    name: string;
    
    /**
     * The reference to the process template associated with this job reference.
     */
    template: string;
    
    /**
     * The status of the job associated with this job reference.
     */
    status: string;
    
    /**
     * The creation date of the job associated with this job reference.
     */
    created: string;
    
    /**
     * The last update date of the job associated with this job reference.
     */
    updated: string;
}
