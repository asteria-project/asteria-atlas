import { ProcessType } from './process-type.enum';
import { ProcessCategory } from './process-category.enum';

/**
 * The <code>ProcessDefinition</code> interface defines the API that you must implement to create an Asteria process
 * definition.
 */
export interface ProcessDefinition {

    /**
     * Specifies the Hyperion type for this process.
     */
    type: ProcessType;

    /**
     * The help description for this process.
     */
    description: string;
    
    /**
     * Specifies the category for this process.
     */
    category: ProcessCategory;
}