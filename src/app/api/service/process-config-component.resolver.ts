import { Injectable, Type } from '@angular/core';
import { FileReadConfigComponent } from 'src/app/component/template-config/file-read-config/file-read-config.component';
import { ProcessRef } from '../business/process-ref.enum';

/**
 * The <code>ProcessConfigComponentResolver</code> resolver allows to map a process reference to its config component.
 */
@Injectable()
export class ProcessConfigComponentResolver {

    /**
     * Return the config component with the specified reference.
     *
     * @param {ProcessRef} ref the reference of the process for which to get the config component.
     * 
     * @returns {Type<any>} the config component with the specified reference.
     */
    public getComponent(ref: ProcessRef): Type<any> {

        return FileReadConfigComponent;
    }
}