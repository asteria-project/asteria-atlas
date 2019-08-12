import { Injectable, Injector } from '@angular/core';
import { HeliosTemplate, HeliosData } from 'asteria-eos';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorMessageBuilder } from '../../../gui-module';
import { AbstractHeliosService } from '../core/abstract-helios.service';
import { HttpErrorResponse } from '@angular/common/http';

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
   * @returns {Observable<HeliosData<Array<HeliosTemplate>>>} the list of templates registered in the associated Helios 
   *                                                          server instance.
   */
  public getTemplates(): Observable<HeliosData<Array<HeliosTemplate>>> {
    return this.http.get<HeliosData<Array<HeliosTemplate>>>('http://localhost:3000/asteria/templates')
                    .pipe(
                      catchError((error: HttpErrorResponse)=> {
                        this.notification.error(
                          'Template List Error', 
                          ErrorMessageBuilder.build(error)
                        );
                        return of(null);
                      })
                    );
  }

  /**
   * Return the template registered in the associated Helios server instance with the specified ID.
   * 
   * @param {string} id the ID of the template to get.
   * 
   * @returns {Observable<HeliosData<HeliosTemplate>>} the template registered in the associated Helios server instance 
   *                                                   with the specified ID.
   */
  public getTemplate(id: string): Observable<HeliosData<HeliosTemplate>> {
    return this.http.get<HeliosData<HeliosTemplate>>('http://localhost:3000/asteria/templates/' + id)
                    .pipe(
                      catchError((error: HttpErrorResponse)=> {
                        this.notification.error(
                          'Template Access Error', 
                          ErrorMessageBuilder.build(error)
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
   * @returns {Observable<HeliosData<string>>} the template registered in the associated Helios server instance with the
   *                                           specified ID.
   */
  public createTemplate(partialTemplate: HeliosTemplate): Observable<HeliosData<string>> {
    return this.http.post<HeliosData<string>>('http://localhost:3000/asteria/templates/', partialTemplate)
                    .pipe(
                      catchError((error: HttpErrorResponse)=> {
                        this.notification.error(
                          'Template Creation Error', 
                          ErrorMessageBuilder.build(error)
                        );
                        return of(null);
                      })
                    );
  }
  
  /**
   * Delete the template with the specified ID.
   * 
   * @param {HeliosTemplate} partialTemplate the ID of the template to delete.
   */
  public deleteTemplate(id: string): Observable<HeliosData<any>> {
    return this.http.delete<HeliosData<any>>(`http://localhost:3000/asteria/templates/${id}`)
                    .pipe(
                      catchError((error: HttpErrorResponse)=> {
                        this.notification.error(
                          'Template Deletion Error', 
                          ErrorMessageBuilder.build(error)
                        );
                        return of(null);
                      })
                    );
  }
}