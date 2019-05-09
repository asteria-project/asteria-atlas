import { Injectable } from '@angular/core';
import { FileReadConfigComponent } from 'src/app/component/template-config/file-read-config/file-read-config.component';

/**
 * The <code>ProcessConfigComponentResolver</code> allows to map a process reference to its config component.
 */
@Injectable()
export class ProcessConfigComponentResolver {

    /**
     * 
     * @param compRef 
     * 
     * @returns {any}
     */
    public getComponent(compRef: string): any {

        return FileReadConfigComponent;
    }
}