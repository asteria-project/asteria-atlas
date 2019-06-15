import { Injectable, Injector } from '@angular/core';
import { HeliosTemplate } from 'asteria-eos';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorMessageBuilder } from '../../../gui-module';
import { AbstractHeliosService } from '../core/abstract-helios.service';

/**
 * The <code>TemplateService</code> service provides access to the Helios templates API.
 */
@Injectable({
  providedIn: 'root'
})
export class TemplateService extends AbstractHeliosService {
    
  /**
   * Create a new <code>TemplateService</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
  }

  /**
   * Return the list of templates registered in the associated Helios server instance.
   * 
   * @returns {Observable<Array<HeliosTemplate>>} the list of templates registered in the associated Helios server
   *                                              instance.
   */
  public getTemplates(): Observable<Array<HeliosTemplate>> {
    return this.http.get<Array<HeliosTemplate>>('http://localhost:3000/asteria/templates')
                    .pipe(
                      catchError(error=> {
                        this.notification.error(
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
    return this.http.get<HeliosTemplate>('http://localhost:3000/asteria/templates/' + id)
                    .pipe(
                      catchError(error=> {
                        this.notification.error(
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
    return this.http.post<string>('http://localhost:3000/asteria/templates/', partialTemplate)
                    .pipe(
                      catchError(error=> {
                        this.notification.error(
                          'Template Creation Error', 
                          ErrorMessageBuilder.build(error.status)
                        );
                        return of(null);
                      })
                    );
  }
}