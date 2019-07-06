import { Injectable, Injector } from '@angular/core';
import { ErrorMessageBuilder } from '../../../gui-module';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AbstractHeliosService } from '../core/abstract-helios.service';
import { HeliosCsvPreview, HeliosData, HeliosFileStats } from 'asteria-eos';

/**
 * The service responsible for working with files stored int the Helios server workspace.
 */
@Injectable({
  providedIn: 'root'
})
export class WorkspaceService extends AbstractHeliosService {

  /**
   * The reference to the workspace controller URL.
   */
  private readonly CONTROLLER_URL: string = null;

  /**
   * Create a new <code>WorkspaceService</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
    // TODO: build the URL from the app config.
    this.CONTROLLER_URL = 'http://localhost:3000/asteria/workspace/controller';
  }

  /**
   * Return the list of files and directories stored in the specified directory.
   * 
   * @param {string} dirPath the path to the directory to scan.
   * 
   * @returns {Observable<HeliosData<Array<HeliosFileStats>>>} the list of files and directories stored in the specified
   *                                                           directory.
   */
  public list(dirPath: string): Observable<HeliosData<Array<HeliosFileStats>>> {
    this.waitingService.show();
    const route: string = `${this.CONTROLLER_URL}/list?path=${dirPath}`;
    return this.http.get<HeliosData<Array<HeliosFileStats>>>(route)
      .pipe(
        tap((value: any) => this.waitingService.hide()),
        catchError(error => {
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
   * @returns {Observable<HeliosData<HeliosCsvPreview>>} a preview of the specified CSV file.
   */
  public csvPreview(filePath: string): Observable<HeliosData<HeliosCsvPreview>> {
    this.waitingService.show();
    const route: string = `${this.CONTROLLER_URL}/preview?path=${filePath}`;
    return this.http.get<HeliosData<HeliosCsvPreview>>(route)
      .pipe(
        tap((value: any) => this.waitingService.hide()),
        catchError(error => {
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