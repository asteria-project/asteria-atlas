import { Component, Injector, OnInit } from '@angular/core';
import { HeliosTemplate } from 'asteria-eos';
import { TemplateService } from '../../../business-module';
import { AtlasViewComponent, BreadcrumbItemBuilder, } from '../../../gui-module';

/**
 * The view responsible for displaying the list of Asteria session templates.
 */
@Component({
  selector: 'template-list',
  templateUrl: './template-list.component.html'
})
export class TemplateListComponent extends AtlasViewComponent implements OnInit {

  /**
   * The reference to the template service.
   */
  private readonly _templateService: TemplateService = null;

  /**
   * The list of templates displayed in this view.
   */
  protected templateList: Array<HeliosTemplate> = [];

  /**
   * Create a new <code>TemplateListComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'Process Templates';
    this._templateService = injector.get(TemplateService);
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build(this.title)
    ]);
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this._templateService.getTemplates().subscribe((templates: Array<HeliosTemplate>)=> {
      this.templateList = templates;
      this.lastUpdated = Date.now();
    });
  }

  /**
   * Invoked each time the user selects a template in the list.
   * 
   * @param {HeliosTemplate} template the template selected by the user.
   */
  protected selectTemplate(template: HeliosTemplate): void {
    this.router.navigate( [`/processes/templates/${template.id}`] );
  }
}