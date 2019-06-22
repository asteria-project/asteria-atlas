import { Component, Injector, OnInit } from '@angular/core';
import { JobReference } from '../../../business-module';
import { AtlasViewComponent, BreadcrumbItemBuilder } from '../../../gui-module';

/**
 * The view responsible for displaying the list of Asteria sessions.
 */
@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: [ './job-list.component.scss' ]
})
export class JobListComponent extends AtlasViewComponent implements OnInit {

  /**
   * The list of jobs displayed in this view.
   */
  protected jobList: Array<JobReference> = null;

  /**
   * Create a new <code>JobListComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
  constructor(protected injector: Injector) {
    super(injector)
    this.title = 'All Jobs';
    this.backButtonRoute = '/job';
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build('Jobs', '/job'),
      BreadcrumbItemBuilder.build(this.title)
    ]);
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.jobList = [
      {
        id: '72675ac2-1720-4742-87b2-30fa86bbd9a8',
        name: 'Largest US Cities',
        template: 'UsMegaCities',
        status: 'DONE',
        created: '1557331488669',
        updated: '1559216306391'
      },
      {
        id: '414cbc7b-d2d0-40fa-b78f-9714a92357a0',
        name: 'Apollo 13 Logs',
        template: 'NasaLogsAnalytics',
        status: 'IN_PROGRESS',
        created: '1557331521715',
        updated: '1559216578507'
      }
    ];
    this.lastUpdated = Date.now();
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