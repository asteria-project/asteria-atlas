import { Component, Injector } from '@angular/core';
import { ClipboardService } from '../../service/clipboard.service';
import { ClipboardItem } from '../../model/clipboard-item.model';

/**
 * The <code>ClipboardComponent</code> component allows to manage the Atlas clipboard.
 */
@Component({
  selector: 'clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: [ './clipboard.component.scss' ]
})
export class ClipboardComponent {

  /**
   * The reference to the clipboard service.
   */
  protected readonly clipboardService: ClipboardService = null;

  /**
   * Specified the co,tent of the current item selected by the user.
   */
  protected itemContent: string = null;

  /**
   * Create a new <code>ClipboardComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
   constructor(protected injector: Injector) {
    this.clipboardService = injector.get(ClipboardService);
  }

  /**
   * Remove all elements from the clipboard.
   */
  protected clearAll(): void {
    this.clipboardService.clear();
    this.itemContent = null;
  }

  /**
   * 
   * 
   * @param {ClipboardItem} item 
   */
  protected showItemContent(item: ClipboardItem): void {
    this.itemContent = item.content;
  }

  /**
   * Delete the specified item  from the clipboard.
   * 
   * @param {ClipboardItem} item the item to delete.
   */
  protected deleteItem(item: ClipboardItem): void {
    this.clipboardService.removeFromClipboard(item);
  }
}