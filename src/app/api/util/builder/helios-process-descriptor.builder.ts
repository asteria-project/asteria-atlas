import { HeliosProcessDescriptor } from 'asteria-eos';
import { HeliosProcessDescriptorImpl } from '../../business/impl/helios-process-descriptor.impl';

/**
 * The builder that dreates <code>HeliosProcessDescriptor</code> objects.
 */
export class HeliosProcessDescriptorBuilder {

    /**
     * Build and return a new <code>HeliosProcessDescriptor</code> object.
     * 
     * @param {string} type the type of the new <code>HeliosProcessDescriptor</code> object.
     * 
     * @return {HeliosProcessDescriptor} a new <code>HeliosProcessDescriptor</code> object.
     */
    public static build(type: string): HeliosProcessDescriptor {
        const template: HeliosProcessDescriptor = new HeliosProcessDescriptorImpl();
        template.type = type;
        return template;
    }
}