import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeliosTemplate } from 'asteria-eos';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService, ErrorMessageBuilder } from '../../../gui-module';

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
     * The reference to the Atlas notifications service.
     */
    private readonly _notification: NotificationService = null;
    
    /**
     * Create a new <code>TemplateService</code> instance.
     * 
     * @param {Injector} injector the reference to the Angular services injector.
     */
    constructor(protected injector: Injector) {
        this._http = injector.get(HttpClient);
        this._notification = injector.get(NotificationService);
    }

    /**
     * Return the list of templates registered in the associated Helios server instance.
     * 
     * @returns {Observable<Array<HeliosTemplate>>} the list of templates registered in the associated Helios server
     *                                              instance.
     */
    public getTemplates(): Observable<Array<HeliosTemplate>> {
        return this._http.get<Array<HeliosTemplate>>('http://localhost:3000/asteria/templates')
                         .pipe(
                            catchError(error=> {
                                this._notification.error(
                                    'Template List Error', 
                                    ErrorMessageBuilder.build(error.status)
                                );
                                return of([]);
                            })
                        );
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
        return this._http.get<HeliosTemplate>('http://localhost:3000/asteria/templates/' + id)
                         .pipe(
                            catchError(error=> {
                                this._notification.error(
                                    'Template Access Error', 
                                    ErrorMessageBuilder.build(error.status)
                                );
                                return of(null);
                            })
                         );
    }

    /**
     * Return the template registered in the associated Helios server instance with the specified ID.
     * 
     * @param {HeliosTemplate} partialTemplate the ID of the template to get.
     * 
     * @returns {Observable<string>} the template registered in the associated Helios server instance with the
     *                                       specified ID.
     */
    public createTemplate(partialTemplate: HeliosTemplate): Observable<string> {
        return this._http.post<string>('http://localhost:3000/asteria/templates/', partialTemplate)
                         .pipe(
                            catchError(error=> {
                                this._notification.error(
                                    'Template Creation Error', 
                                    ErrorMessageBuilder.build(error.status)
                                );
                                return of(null);
                            })
                         );
    }
}