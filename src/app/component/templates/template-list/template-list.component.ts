import { Component } from '@angular/core';

/**
 * The view responsible for displaying the list of Asteria session templates.
 */
@Component({
  selector: 'template-list',
  templateUrl: './template-list.component.html',
  styleUrls: [ './template-list.component.scss' ]
})
export class TemplateListComponent {

  protected templateList: Array<{ name: string; description: string; }> = [
    {
      name: 'UsMegaCities',
      description: 'Extract the list of US cities with more than 1 million residents.'
    },
    {
      name: 'NasaLogsAnalytics',
      description: 'Extract the data access logs for the Apollo 13 mission.'
    }
  ];

  /**
   * Create a new <code>TemplateListComponent</code> instance.
   * 
   * @param {} the reference to the the <code>DomSanitizer</code> instance injected by Angular.
   */
  constructor(){}

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