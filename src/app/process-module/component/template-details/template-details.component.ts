import { Component, Injector, OnInit } from '@angular/core';
import { HeliosTemplate } from 'asteria-eos';
import { TemplateService } from '../../../business-module';
import { ActivatedRoute } from '@angular/router';
import { AtlasViewComponent, BreadcrumbItemBuilder, FileSaverService } from '../../../gui-module';

/**
 * The view responsible for displaying the details of an Asteria session template.
 */
@Component({
  selector: 'template-details',
  templateUrl: './template-details.component.html',
  styleUrls: [ './template-details.component.scss' ]
})
export class TemplateDetailsComponent extends AtlasViewComponent implements OnInit {

  /**
   * The reference to the template service.
   */
  private readonly _templateService: TemplateService = null;

  /**
   * The reference to the file saver service.
   */
  private readonly _fileSaverService: FileSaverService = null;

  /**
   * The reference to the current route.
   */
  private _route: ActivatedRoute = null;

  /**
   * The template displayed in this view.
   */
  protected template: HeliosTemplate = null;

  /**
   * Create a new <code>TemplateDetailsComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'Process Template Details';
    this.backButtonRoute = '/process/templates';
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build('Processes', '/process'),
      BreadcrumbItemBuilder.build('Process Templates', this.backButtonRoute),
      BreadcrumbItemBuilder.build(this.title)
    ]);
    this._templateService = injector.get(TemplateService);
    this._fileSaverService = injector.get(FileSaverService); 
    this._route = injector.get(ActivatedRoute);
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    const id: string = this._route.snapshot.paramMap.get('id');
    this._templateService.getTemplate(id).subscribe((template: HeliosTemplate)=> {
      this.template = template;
      this.setUpdatedDate();
    });
  }

  /**
   * Launch a new process based on the current template.
   */
  protected runProcess(): void {
    this.router.navigate([`/process/templates/${this.template.id}/run-process`]);
  }

  /**
   * Edit the current template.
   */
  protected editTemplate(): void {
    this.router.navigate( [`/edit/template/${this.template.id}`] );
  }

  /**
   * Export the current template.
   */
  protected exportTemplate(): void {
    const name: string = this.template.name;
    const tpl: HeliosTemplate = {
      name: name,
      id: null,
      description: this.template.description,
      processes: this.template.processes
    };
    this._fileSaverService.saveJson(tpl, name);
  }

  /**
   * Delete the current template.
   */
  protected deleteTemplate(): void {

  }
}