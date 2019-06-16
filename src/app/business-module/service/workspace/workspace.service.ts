import { Injectable, Injector } from '@angular/core';
import { ErrorMessageBuilder } from '../../../gui-module';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AbstractHeliosService } from '../core/abstract-helios.service';

/**
 * The service responsible for working with files stored int the Helios server workspace.
 */
@Injectable({
  providedIn: 'root'
})
export class WorkspaceService extends AbstractHeliosService {
    
  /**
   * Create a new <code>WorkspaceService</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
  }
  
  /**
   * Return the list of files and directories stored in the specified directory.
   * 
   * @param {string} dirPath the path to the directory to scan.
   * 
   * @returns {Observable<any>} the list of files and directories stored in the specified directory.
   */
  public list(dirPath: string): Observable<any> {
    this.waitingService.show();
    const route: string = `http://localhost:3000/asteria/workspace/controller/list/${dirPath}`;
    return this.http.get<any>(route)
                    .pipe(
                      tap((value: any)=> this.waitingService.hide()),
                      catchError(error=> {
                        this.notification.error(
                          'Worspace File List Error', 
                          ErrorMessageBuilder.build(error.status)
                        );
                        this.waitingService.hide();
                        return of([]);
                      })
                    );
  }
  
  /**
   * Return a preview of the specified CSV file.
   * 
   * @param {string} filePath the path to the file to preview.
   * 
   * @returns {Observable<string>} a preview of the specified CSV file.
   */
  public csvPreview(filePath: string): Observable<any> {
    this.waitingService.show();
    const route: string = `http://localhost:3000/asteria/workspace/controller/preview/${filePath}`;
    return this.http.get(route, {responseType: 'text'})
                    .pipe(
                      tap((value: any)=> this.waitingService.hide()),
                      catchError(error=> {
                        this.notification.error(
                          'File Preview Error', 
                          ErrorMessageBuilder.build(error.status)
                        );
                        this.waitingService.hide();
                        return of([]);
                      })
                    );
  }
}