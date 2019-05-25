import { HeliosTemplate, HeliosProcessDescriptor } from 'asteria-eos';
import { HeliosTemplateImpl } from '../../business/impl/helios-template.impl';

/**
 * The builder that dreates <code>HeliosTemplate</code> objects.
 */
export class HeliosTemplateBuilder {

    /**
     * Build and return a new <code>HeliosTemplate</code> object.
     * 
     * @return {HeliosTemplate} a new <code>HeliosTemplate</code> object.
     */
    public static build(): HeliosTemplate {
        const template: HeliosTemplate = new HeliosTemplateImpl();
        template.name = 'New_Helios_Template';
        template.description = 'A functional description of this template.';
        template.processes = new Array<HeliosProcessDescriptor>();
        return template;
    }
}