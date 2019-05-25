import { HeliosTemplate, HeliosProcessDescriptor } from 'asteria-eos';

/**
 * The default implementation of the <code>HeliosTemplate</code> interface.
 */
export class HeliosTemplateImpl implements HeliosTemplate {

    /**
     * @inheritdoc
     */
    public name: string = null;
    
    /**
     * @inheritdoc
     */
    public id: string = null;
    
    /**
     * @inheritdoc
     */
    public description: string = null;
    
    /**
     * @inheritdoc
     */
    public processes: Array<HeliosProcessDescriptor> = null;
}