import { ProcessType } from './process-type.enum';
import { ProcessCategory } from './process-category.enum';

/**
 * The <code>ProcessDefinitionCategory</code> interface defines the API that you must implement to define an Asteria 
 * process category.
 */
export interface ProcessDefinitionCategory {

    /**
     * The name of the process category.
     */
    name: string;

    /**
     * The help description for this process category.
     */
    description: ProcessType;
    
    /**
     * Specifies mapping for this process category.
     */
    category: ProcessCategory;

    /**
     * The icon associated with this process category.
     */
    icon: string;
}