import { Component, Injector } from '@angular/core';
import { AtlasViewComponent, BreadcrumbItemBuilder, HomeLink } from '../../../gui-module';

/**
 * The view responsible for displaying the workspace home page.
 */
@Component({
  selector: 'workspace-home',
  templateUrl: './workspace-home.component.html'
})
export class WorkspaceHomeComponent extends AtlasViewComponent {

  /**
   * The list of links for this view.
   */
  protected linkList:HomeLink [] = [
    {
      title: 'Files Explorer',
      icon: 'folder',
      routerLink: '/workspace/explorer',
      description: 'File Explorer is a file manager application that provides a graphical user interface for accessing the Helios server workspace.'
    },
    {
      title: 'File Preview',
      icon: 'eye',
      routerLink: '/workspace/preview',
      description: 'The File Preview manager allows you to view and analyze content of CSV files without downloading them.'
    }
  ];

  /**
   * Create a new <code>WorkspaceHomeComponent</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'Workspace';
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build(this.title)
    ]);
  }
}