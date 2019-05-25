import { Component, Injector } from '@angular/core';
import { BreadcrumbItemBuilder, JobReference } from '../../../api';
import { AtlasViewComponent } from '../../layout/atlas-view/atlas-view.component';

/**
 * The view responsible for displaying the list of Asteria sessions.
 */
@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: [ './job-list.component.scss' ]
})
export class JobListComponent extends AtlasViewComponent {

  /**
   * The list of jobs displayed in this view.
   */
  protected jobList: Array<JobReference> = [
    {
      id: '72675ac2-1720-4742-87b2-30fa86bbd9a8',
      name: 'Largest US Cities',
      template: 'UsMegaCities',
      status: 'DONE',
      created: '1557331488669'
    },
    {
      id: '414cbc7b-d2d0-40fa-b78f-9714a92357a0',
      name: 'Apollo 13 Logs',
      template: 'NasaLogsAnalytics',
      status: 'IN_PROGRESS',
      created: '1557331521715'
    }
  ];

  /**
   * Create a new <code>JobListComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
  constructor(protected injector: Injector) {
    super(injector)
    this.title = 'All Jobs';
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build(this.title)
    ]);
  }

  /**
   * 
   * @param status
   * 
   * @returns {string}
   */
  protected getStatusIcon(status: string): string {
    let icon: string = 'check-circle';
    return icon;
  }

  /**
   * 
   * @param status
   * 
   * @returns {string}
   */
  protected getStatusStyle(status: string): string {
    let style: string = 'job-done';
    return style;
  }
}