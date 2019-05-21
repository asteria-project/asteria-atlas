import { Component, Injector, OnInit } from '@angular/core';
import { HeliosTemplate } from 'asteria-eos';
import { TemplateService } from '../../../api/service/template/template.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AtlasViewComponent } from '../../layout/atlas-view/atlas-view.component';
import { BreadcrumbItemBuilder } from 'src/app/api/util/breadcrumb/breadcrumb-item.builder';

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
   * The reference to the current route.
   */
  private _route: ActivatedRoute = null;

  /**
   * The template displayed in this view.
   */
  protected template: HeliosTemplate = null;

  /**
   * Create a new <code>TemplateListComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
  constructor(protected injector: Injector) {
    super(injector);
    this._templateService = injector.get(TemplateService);
    this._route = injector.get(ActivatedRoute);
    this.title = 'Template Details';
    this.backButtonRoute = '/templates';
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build('Job Templates', this.backButtonRoute),
      BreadcrumbItemBuilder.build(this.title)
    ]);
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    const id: string = this._route.snapshot.paramMap.get('id');
    this._templateService.getTemplate(id).subscribe((template: HeliosTemplate)=> {
      this.template = template;
    });
  }
}