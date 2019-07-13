import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, empty} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorMessageBuilder, HttpUtils } from '../../../gui-module';
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
   * The reference to the process controller URL.
   */
  private readonly CONTROLLER_URL: string = null;

  /**
   * Create a new <code>TemplateService</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
    // TODO: build the URL from the app config.
    this.CONTROLLER_URL = 'http://localhost:3000/asteria/process/controller/run/';
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
    return this.http.post<string>(this.CONTROLLER_URL + template.id, null, HttpUtils.TEXT_RESPONSE_OPTIONS)
                    .pipe(
                      tap((value: any)=> this.waitingService.hide()),
                      catchError((error: HttpErrorResponse)=> {
                        this.notification.error(
                          'Process Running Error', 
                          ErrorMessageBuilder.build(error)
                        );
                        this.waitingService.hide();
                        return empty();
                      })
                    );
  }
}