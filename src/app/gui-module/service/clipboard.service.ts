import { Injectable, Injector } from '@angular/core';
import { NotificationService } from './notification.service';

/**
 * The service responsible for managing clipboard access.
 */
@Injectable({
    providedIn: 'root'
})
export class ClipboardService {

  /**
   * The reference to the Atlas notifications service.
   */
  private readonly _notification: NotificationService = null;

  /**
   * Create a new <code>ClipboardService</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    this._notification = injector.get(NotificationService);
  }

  /**
   * Copy the specified input string into the clipboard.
   * 
   * @param {string} input the string to copy into the clipboard.
   */
  public copyToClipboard(input: string): void {
    try {
      document.addEventListener('copy', (event: ClipboardEvent) => {
        event.clipboardData.setData('text/plain', input);
        event.preventDefault();
        document.removeEventListener('copy', null);
        this._notification.success(
          'Copy Success',
          `Element copied to clipboard: "${input}"`
        );
      });
      document.execCommand('copy');
    } catch (e) {
      this._notification.success(
        'Copy Error',
        e
      )
    }
  }
}
    