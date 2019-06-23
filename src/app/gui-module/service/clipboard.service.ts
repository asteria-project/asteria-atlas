import { Injectable, Injector } from '@angular/core';
import { NotificationService } from './notification.service';
import { ClipboardItem } from '../model/clipboard-item.model';

/**
 * The service responsible for managing Atlas clipboard.
 */
@Injectable({
    providedIn: 'root'
})
export class ClipboardService {

  /**
   * The list of items stored in clipboard.
   */
  private _items: ClipboardItem[] = null;

  /**
   * Indicates whether the clipboard panel is opened (<code>true</code>), or not (<code>false</code>).
   */
  private _visible: boolean = false;

  /**
   * Return a boolean that indicates whether the clipboard panel is opened (<code>true</code>), or not
   * (<code>false</code>).
   */
  public get visible(): boolean {
    return this._visible;
  }

  /**
   * Return the size of the internal clipboad items collection.
   */
  public get size(): number {
    return this._items.length;
  }

  /**
   * Return list of items stored in clipboard.
   */
  public get items(): ClipboardItem[] {
    return this._items;
  }

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
    this._items = new Array();
  }

  /**
   * Open the clipboard panel.
   */
  public open(): void {
    this._visible = true;
  }

  /**
   * Close the clipboard panel.
   */
  public close(): void {
    this._visible = false;
  }

  /**
   * Copy the specified item into the clipboard.
   * 
   * @param {ClipboardItem} input the item to copy into the clipboard.
   */
  public copyToClipboard(input: ClipboardItem): void {
    try {
      this._items.push(input);
      document.addEventListener('copy', (event: ClipboardEvent) => {
        event.clipboardData.setData('text/plain', input.content);
        event.preventDefault();
        document.removeEventListener('copy', null);
        this._notification.success(
          'Copy Success',
          `Element copied to clipboard: "${input.name}"`
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
    