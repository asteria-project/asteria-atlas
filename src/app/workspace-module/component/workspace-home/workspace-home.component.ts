import { Component, OnInit, Injector } from '@angular/core';
import { AtlasViewComponent, BreadcrumbItemBuilder } from '../../../gui-module';

/**
 * The view responsible for displaying the workspace home page.
 */
@Component({
  selector: 'workspace-home',
  templateUrl: './workspace-home.component.html',
  styleUrls: [ './workspace-home.component.scss' ]
})
export class WorkspaceHomeComponent extends AtlasViewComponent implements OnInit {

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
  
  /**
   * @inheritdoc
   */
  public ngOnInit(): void {}
}