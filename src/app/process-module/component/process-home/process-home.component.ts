import { Component, Injector } from '@angular/core';
import { AtlasViewComponent, BreadcrumbItemBuilder, HomeLink } from '../../../gui-module';

/**
 * The view responsible for displaying the process home page.
 */
@Component({
  selector: 'process-home',
  templateUrl: './process-home.component.html'
})
export class ProcessHomeComponent extends AtlasViewComponent {

  /**
   * The list of links for this view.
   */
  protected linkList: HomeLink[] = [
    {
      title: 'Process Templates',
      icon: 'code',
      routerLink: '/process/templates',
      description: 'Provides the list of all templates registered in the Helios server.'
    },
    {
      title: 'Template Editor',
      icon: 'edit',
      routerLink: '/edit',
      description: 'The Job Editor application provides all functionalities for creating and editing templates.'
    }
  ];

  /**
   * Create a new <code>ProcessHomeComponent</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'Processes';
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build(this.title)
    ]);
  }
}