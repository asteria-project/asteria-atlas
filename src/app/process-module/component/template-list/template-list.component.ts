import { Component, Injector, OnInit } from '@angular/core';
import { HeliosTemplate, HeliosData } from 'asteria-eos';
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
  public templateList: Array<HeliosTemplate> = [];

  /**
   * Create a new <code>TemplateListComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'Process Templates';
    this._templateService = injector.get(TemplateService);
    this.backButtonRoute = '/process';
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build('Processes', this.backButtonRoute),
      BreadcrumbItemBuilder.build(this.title)
    ]);
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this._templateService.getTemplates().subscribe((result: HeliosData<Array<HeliosTemplate>>)=> {
      this.templateList = result ? result.data : new Array<HeliosTemplate>();
      this.setUpdatedDate();
    });
  }

  /**
   * Invoked each time the user selects a template in the list.
   * 
   * @param {HeliosTemplate} template the template selected by the user.
   */
  protected selectTemplate(template: HeliosTemplate): void {
    this.router.navigate( [`/process/templates/${template.id}`] );
  }
}