import { Component, Injector, OnInit } from '@angular/core';
import { BreadcrumbService, WaitingService, SpinnerState, ClipboardService } from '../../../gui-module';

/**
 * The <code>AtlasContainerComponent</code> component provides the main layout of the Atlas application.
 */
@Component({
  selector: 'atlas-container',
  templateUrl: './atlas-container.component.html',
  styleUrls: [ './atlas-container.component.scss' ]
})
export class AtlasContainerComponent implements OnInit {

  /**
   * Indicates that the menu is collapsed (<code>true</code>), or not (<code>false</code>).
   */
  protected isCollapsed: boolean = false;

  /**
   * Indicates that state of the blocking modal component.
   */
  protected spinnerState: SpinnerState = null;

  /**
   * The reference to the clipboard service.
   */
  protected readonly clipboardService: ClipboardService = null;

  /**
   * The reference to the breadcrumb service.
   */
  protected readonly breadcrumbService: BreadcrumbService = null;

  /**
   * The reference to the waiting service.
   */
  private readonly _waitingService: WaitingService = null;

  /**
   * Create a new <code>AtlasContainerComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
   constructor(protected injector: Injector) {
    this.breadcrumbService = injector.get(BreadcrumbService);
    this._waitingService = injector.get(WaitingService);
    this.clipboardService = injector.get(ClipboardService);
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this._waitingService.stateChange.subscribe((state: SpinnerState)=> {
      this.spinnerState = state;
    });
  }
}