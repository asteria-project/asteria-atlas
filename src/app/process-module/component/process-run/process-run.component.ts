import { Component, Injector, OnInit } from '@angular/core';
import { HeliosTemplate } from 'asteria-eos';
import { ProcessService, TemplateService } from '../../../business-module';
import { ActivatedRoute } from '@angular/router';
import { AtlasViewComponent, BreadcrumbItemBuilder } from '../../../gui-module';

/**
 * The view responsible for displaying the result of an Asteria session.
 */
@Component({
  selector: 'process-run',
  templateUrl: './process-run.component.html',
  styleUrls: [ './process-run.component.scss' ]
})
export class ProcessRunComponent extends AtlasViewComponent implements OnInit {

  /**
   * The reference to the process service.
   */
  private readonly _processService: ProcessService = null;

  /**
   * The reference to the current route.
   */
  private _route: ActivatedRoute = null;

  /**
   * The reference to the template service.
   */
  private readonly _templateService: TemplateService = null;

  /**
   * The template displayed in this view.
   */
  protected template: HeliosTemplate = null;

  /**
   * A string that contains the result of the process.
   */
  protected resultValue: string = null;

  /**
   * Indicates the duration of the current process.
   */
  protected processDuration: number = null;

  /**
   * Create a new <code>ProcessRunComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'Running Process';
    this._templateService = injector.get(TemplateService);
    this._processService = injector.get(ProcessService); 
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
      this.backButtonRoute = '/process/templates/' + id;
      this.breadcrumbService.setItems([
        BreadcrumbItemBuilder.build('Processes', '/process'),
        BreadcrumbItemBuilder.build('Process Templates', '/process/templates'),
        BreadcrumbItemBuilder.build('Process Template Details', this.backButtonRoute),
        BreadcrumbItemBuilder.build(this.title)
      ]);
      this.runProcess();
    });
  }

  /**
   * Run a new process based on the current template.
   */
  protected runProcess(): void {
    const start: number = Date.now();
    this._processService.run(this.template).subscribe((result: any)=> {
      this.resultValue = result.toString();
      const end: number =  Date.now();
      this.processDuration = end - start;
      this.lastUpdated = end;
    });
  }
}