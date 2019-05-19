import { Component, Injector } from '@angular/core';
import { BreadcrumbService } from 'src/app/api/service/ui/breadcrumb.service';

/**
 * The <code>AtlasContainerComponent</code> component provides the main layout of the Atlas application.
 */
@Component({
  selector: 'atlas-container',
  templateUrl: './atlas-container.component.html',
  styleUrls: [ './atlas-container.component.scss' ]
})
export class AtlasContainerComponent {

  /**
   * Indicates the the menu is collapsed (<code>true</code>), or not (<code>false</code>).
   */
  protected isCollapsed: boolean = false;

  /**
   * The reference to the breadcrumb service.
   */
  protected readonly breadcrumbService: BreadcrumbService = null;

  /**
   * Create a new <code>AtlasContainerComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
   constructor(protected injector: Injector) {
    this.breadcrumbService = injector.get(BreadcrumbService);
  }
}