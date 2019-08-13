import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../service/breadcrumb.service';

/**
 * The <code>AtlasViewComponent</code> class is the base class for all Atlas app views.
 */
@Component({
  selector: 'atlas-view',
  template: '<div>Must be overridden!</div>'
})
export abstract class AtlasViewComponent {

  /**
   * The reference to the breadcrumb service.
   */
  protected readonly breadcrumbService: BreadcrumbService = null;

  /**
   * The reference to the Angular routing service.
   */
  protected readonly router: Router = null;

  /**
   * The title of the view.
   */
  public title: string = '';
  
  /**
   * The route associated with the title back button.
   */
  protected backButtonRoute: string = '';

  /**
   * Indicates the last update timestamp for data displayed in this view.
   */
  public lastUpdated: number = null;

  /**
   * Create a new <code>AtlasViewComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
   protected constructor(protected injector: Injector) {
    this.breadcrumbService = injector.get(BreadcrumbService);
    this.router = injector.get(Router);
   }
   
  /**
   * Title back button event listener.
   */
  public titleBack(): void {
    this.router.navigate( [this.backButtonRoute] );
  }

  /**
   * Set the value of the last updated date.
   */
  protected setUpdatedDate(): void {
    this.lastUpdated = Date.now();
  }
}