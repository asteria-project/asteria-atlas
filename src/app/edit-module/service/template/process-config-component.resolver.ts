import { Injectable, Type } from '@angular/core';
import { ProcessType } from '../../../business-module';
import { FileReadConfigComponent } from '../../component/template-editor-config/file-read-config/file-read-config.component';

/**
 * The <code>ProcessConfigComponentResolver</code> resolver allows to map a process type to its config component.
 */
@Injectable()
export class ProcessConfigComponentResolver {

    /**
     * Return the config component with the specified type.
     *
     * @param {ProcessType} type the type of the process for which to get the config component.
     * 
     * @returns {Type<any>} the config component with the specified type.
     */
    public getComponent(type: ProcessType): Type<any> {

        return FileReadConfigComponent;
    }
}