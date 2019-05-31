import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService, ErrorMessageBuilder, WaitingService } from '../../../gui-module';
import { HeliosTemplate } from 'asteria-eos';

/**
 * The <code>ProcessService</code> service provides access to the Helios processes API.
 */
@Injectable({
    providedIn: 'root'
})
export class ProcessService {

    /**
     * The reference to the Angular HTTP service.
     */
    private readonly _http: HttpClient = null;

    /**
     * The reference to the Atlas notifications service.
     */
    private readonly _notification: NotificationService = null;
    
  /**
   * The reference to the waiting service.
   */
  private readonly _waitingService: WaitingService = null;

    
    /**
     * Create a new <code>TemplateService</code> instance.
     * 
     * @param {Injector} injector the reference to the Angular services injector.
     */
    constructor(protected injector: Injector) {
        this._http = injector.get(HttpClient);
        this._notification = injector.get(NotificationService);
        this._waitingService = injector.get(WaitingService);
    }

    /**
     * Run a process based on the specified template.
     * 
     * @param {HeliosTemplate} template the template from which to create and run a new process.
     * 
     * @returns {Observable<any>} the list of templates registered in the associated Helios server instance.
     */
    public run(template: HeliosTemplate): Observable<any> {
        this._waitingService.show(`Running process "${template.name}"...`);
        const httpOptions: any = {
            responseType:'text'
        };
        return this._http.post<string>('http://localhost:3000/asteria/process/' + template.id, null, httpOptions)
                         .pipe(
                            tap((value: any)=> this._waitingService.hide()),
                            catchError((error: HttpErrorResponse)=> {
                                this._notification.error(
                                    'Process Running Error', 
                                    ErrorMessageBuilder.build(error.status)
                                );
                                this._waitingService.hide();
                                return empty();
                            })
                        );
    }
}