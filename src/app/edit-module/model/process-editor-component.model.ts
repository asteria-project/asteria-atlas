import { HeliosProcessDescriptor } from 'asteria-eos';

/**
 * The <code>ProcessEditorComponent</code> interface represents a component that is responsible for editing an Helios
 * process descriptor object.
 */
export interface ProcessEditorComponent {

    /**
     * Set the Helios process descriptor to this component.
     * 
     * @param {HeliosProcessDescriptor} process the reference to Helios process descriptor ot associate with this
     *                                          component.
     */
    setProcess(process: HeliosProcessDescriptor): void,
}