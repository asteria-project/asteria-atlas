import { Injectable, Injector } from '@angular/core';
import { NotificationService, ErrorMessageBuilder } from '../../../gui-module';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * The service responsible for working with files stored int the Helios server workspace.
 */
@Injectable({
    providedIn: 'root'
})
export class WorkspaceService {

  /**
   * The reference to the Angular HTTP service.
   */
  private readonly _http: HttpClient = null;

  /**
   * The reference to the Atlas notifications service.
   */
  private readonly _notification: NotificationService = null;
    
  /**
   * Create a new <code>WorkspaceService</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    this._http = injector.get(HttpClient);
    this._notification = injector.get(NotificationService);
  }
  
  /**
   * Return the list of files and directories stored in the specified directory.
   * 
   * @param {string} dirPath the path to the directory to scan.
   * 
   * @returns {Observable<any>} the list of files and directories stored in the specified directory.
   */
  public list(dirPath: string): Observable<any> {
    const route: string = `http://localhost:3000/asteria/workspace/controller/list/${dirPath}`;
    return this._http.get<any>(route)
                      .pipe(
                        catchError(error=> {
                            this._notification.error(
                                'Worspace File List Error', 
                                ErrorMessageBuilder.build(error.status)
                            );
                            return of([]);
                        })
                    );
  }
}