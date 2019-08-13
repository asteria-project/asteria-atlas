import { Component, Injector } from '@angular/core';
import { AtlasViewComponent, BreadcrumbItemBuilder, HomeLink } from '../../../gui-module';

/**
 * The view responsible for displaying the job home page.
 */
@Component({
  selector: 'job-home',
  templateUrl: './job-home.component.html'
})
export class JobHomeComponent extends AtlasViewComponent {

  /**
   * The list of links for this view.
   */
  public linkList: HomeLink[] = [
    {
      title: 'Job Events',
      icon: 'bars',
      routerLink: '/job',
      description: 'Provides the list of log events associated with recent job executions.'
    },
    {
      title: 'All Jobs',
      icon: 'eye',
      routerLink: '/job/jobs',
      description: 'Provides the list of all jobs registered in the Helios server.'
    },
    {
      title: 'Job Editor',
      icon: 'edit',
      routerLink: '/job',
      description: 'The Job Editor application provides all functionalities for creating and editing jobs.'
    }
  ];

  /**
   * Create a new <code>JobHomeComponent</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'Jobs';
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build(this.title)
    ]);
  }
}