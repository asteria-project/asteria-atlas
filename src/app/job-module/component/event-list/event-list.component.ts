import { Component } from '@angular/core';

/**
 * The view responsible for displaying the list of Atlas events.
 */
@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: [ './event-list.component.scss' ]
})
export class EventListComponent {

  /**
   * The list of Atlas events to be displayed in this view.
   */
  public eventList: Array<{ id: string; name: string; template: string; status: string; created: string; }> = [
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
   * Create a new <code>EventListComponent</code> instance.
   * 
   * @param {any} param the reference to the the <code>any</code> instance injected by Angular.
   */
  constructor(){}
}