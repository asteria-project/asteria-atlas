import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, empty} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorMessageBuilder } from '../../../gui-module';
import { HeliosTemplate } from 'asteria-eos';
import { AbstractHeliosService } from '../core/abstract-helios.service';

/**
 * The <code>ProcessService</code> service provides access to the Helios processes API.
 */
@Injectable({
  providedIn: 'root'
})
export class ProcessService extends AbstractHeliosService {

  /**
   * Create a new <code>TemplateService</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
  }

  /**
   * Run a process based on the specified template.
   * 
   * @param {HeliosTemplate} template the template from which to create and run a new process.
   * 
   * @returns {Observable<any>} the list of templates registered in the associated Helios server instance.
   */
  public run(template: HeliosTemplate): Observable<any> {
    this.waitingService.show(`Running process "${template.name}"...`);
    const httpOptions: any = {
      responseType:'text'
    };
    return this.http.post<string>('http://localhost:3000/asteria/process/' + template.id, null, httpOptions)
                    .pipe(
                      tap((value: any)=> this.waitingService.hide()),
                      catchError((error: HttpErrorResponse)=> {
                        this.notification.error(
                          'Process Running Error', 
                          ErrorMessageBuilder.build(error.status)
                        );
                        this.waitingService.hide();
                        return empty();
                      })
                    );
  }
}