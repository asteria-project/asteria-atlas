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
   * The list of items stored in the clipboard.
   */
  private _items: Array<ClipboardItem> = null;

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
  public get items(): Array<ClipboardItem> {
    return this._items.slice().reverse();
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
    this._items = new Array<ClipboardItem>();
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
   * Remove all elements from the clipboard.
   */
  public clear(): void {
    this._items.splice(0);
  }

  /**
   * Remove the specified item  from the clipboard.
   * 
   * @param {ClipboardItem} item the item to remove.
   */
  public removeFromClipboard(item: ClipboardItem): void {
    this._items.splice(this._items.indexOf(item), 1);
  }

  /**
   * Copy the specified item into the clipboard.
   * 
   * @param {ClipboardItem} input the item to copy into the clipboard.
   */
  public copyToClipboard(input: ClipboardItem): void {
    this._items.push(input);
    try {
      const handler: EventListenerOrEventListenerObject = (event: ClipboardEvent) => {
        event.clipboardData.setData('text/plain', input.content);
        event.preventDefault();
        document.removeEventListener('copy', handler);
        this._notification.success(
          'Copy Success',
          `Element copied to clipboard: "${input.name}"`
        );
      };
      document.addEventListener('copy', handler);
      document.execCommand('copy');
    } catch (e) {
      this._notification.error(
        'Copy Error',
        e
      )
    }
  }
}
    