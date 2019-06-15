import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService, WaitingService } from '../../../gui-module';

/**
 * The <code>AbstractService</code> class is the base class for all Atlas services that with the Helios REST API.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class AbstractHeliosService {

  /**
   * The reference to the Angular HTTP service.
   */
  protected readonly http: HttpClient = null;

  /**
   * The reference to the Atlas notifications service.
   */
  protected readonly notification: NotificationService = null;

  /**
   * The reference to the waiting service.
   */
  protected readonly waitingService: WaitingService = null;

  /**
   * Create a new <code>AbstractService</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
      this.http = injector.get(HttpClient);
      this.notification = injector.get(NotificationService);
      this.waitingService = injector.get(WaitingService);
  }
}