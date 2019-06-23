import { Component, Injector } from '@angular/core';
import { ClipboardService } from '../../../gui-module';

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
  protected clipboardService: ClipboardService = null;

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
  }
}