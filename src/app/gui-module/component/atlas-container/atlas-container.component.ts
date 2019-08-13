import { Component, Injector, OnInit } from '@angular/core';
import { SpinnerState } from '../../model/spinner-state.model';
import { ClipboardService } from '../../service/clipboard.service';
import { BreadcrumbService } from '../../service/breadcrumb.service';
import { WaitingService } from '../../service/waiting.service';

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
  public isCollapsed: boolean = false;

  /**
   * Indicates that state of the blocking modal component.
   */
  public spinnerState: SpinnerState = null;

  /**
   * The reference to the clipboard service.
   */
  public readonly clipboardService: ClipboardService = null;

  /**
   * The reference to the breadcrumb service.
   */
  public readonly breadcrumbService: BreadcrumbService = null;

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
      setTimeout(()=> {
        this.spinnerState = state;
      }, 0);
    });
  }
}