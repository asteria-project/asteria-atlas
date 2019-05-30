import { Injectable, Injector } from '@angular/core';
import { Observable} from 'rxjs';
import { ProcessDefinition } from '../../model/process-definition.model';
import { HttpClient } from '@angular/common/http';
import { ProcessDefinitionCategory } from '../../model/process-definition-category.model';

/**
 * The <code>ProcessDefinitionService</code> service provides access to the Asteria processes definitions.
 */
@Injectable()
export class ProcessDefinitionService {

    /**
     * The reference to the Angular HTTP service.
     */
    private readonly _http: HttpClient = null;

    /**
     * Create a new <code>ProcessDefinitionService</code> instance.
     * 
     * @param {Injector} injector the reference to the Angular services injector.
     */
    constructor(protected injector: Injector) {
        this._http = injector.get(HttpClient);
    }

    /**
     * Return the list of available Hyperion process definitions.
     * 
     * @returns {Observable<Array<ProcessDefinition>>} the list of available Hyperion process definitions.
     */
    public getProcessDefinitionList(): Observable<Array<ProcessDefinition>> {
        return this._http.get<Array<ProcessDefinition>>('./assets/config/process-definition.json');
    }
    
    /**
     * Return the list of available Hyperion process definition categories.
     * 
     * @returns {Observable<Array<ProcessDefinitionCategory>>} the list of available Hyperion process definition
     *                                                         categories.
     */
    public getProcessDefinitionCategoryList(): Observable<Array<ProcessDefinitionCategory>> {
        return this._http.get<Array<ProcessDefinitionCategory>>('./assets/config/process-definition-category.json');
    }
}