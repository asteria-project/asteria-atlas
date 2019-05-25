import { HeliosProcessDescriptor } from 'asteria-eos';

/**
 * The default implementation of the <code>HeliosProcessDescriptor</code> interface.
 */
export class HeliosProcessDescriptorImpl implements HeliosProcessDescriptor {

    /**
     * @inheritdoc
     */
    public type: string = null;
    
    /**
     * @inheritdoc
     */
    public config: any = null;
}