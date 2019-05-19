import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeliosTemplate } from 'asteria-eos';
import { Observable } from 'rxjs';

/**
 * The <code>TemplateService</code> service provides access to the Helios templates API.
 */
@Injectable()
export class TemplateService {

    /**
     * The reference to the Angular HTTP service.
     */
    private readonly _http: HttpClient = null;

    /**
     * Create a new <code>TemplateService</code> instance.
     * 
     * @param {Injector} injector the reference to the Angular services injector.
     */
    constructor(protected injector: Injector) {
        this._http = injector.get(HttpClient);
    }

    /**
     * Return the list of templates registered in the associated Helios server instance.
     * 
     * @returns {Observable<Array<HeliosTemplate>>} the list of templates registered in the associated Helios server
     *                                              instance.
     */
    public getTemplates(): Observable<Array<HeliosTemplate>> {
        return this._http.get<Array<HeliosTemplate>>('http://localhost:3000/asteria/templates');
    }

    /**
     * Return the template registered in the associated Helios server instance with the specified ID.
     * 
     * @param {string} id the ID of the template to get.
     * 
     * @returns {Observable<HeliosTemplate>} the template registered in the associated Helios server instance with the
     *                                       specified ID.
     */
    public getTemplate(id: string): Observable<HeliosTemplate> {
        return this._http.get<HeliosTemplate>('http://localhost:3000/asteria/templates/' + id);
    }
}