import { Component } from '@angular/core';

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
   * The list of breadcrumb items for this view.
   */
  protected breadcrumb: string[] = ['Atlas'];
}