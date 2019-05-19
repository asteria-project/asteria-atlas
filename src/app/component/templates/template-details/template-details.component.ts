import { Component, Injector, OnInit } from '@angular/core';
import { HeliosTemplate } from 'asteria-eos';
import { TemplateService } from '../../../api/service/template.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * The view responsible for displaying the details of an Asteria session template.
 */
@Component({
  selector: 'template-details',
  templateUrl: './template-details.component.html',
  styleUrls: [ './template-details.component.scss' ]
})
export class TemplateDetailsComponent implements OnInit {

  /**
   * The reference to the template service.
   */
  private readonly _templateService: TemplateService = null;

  /**
   * The reference to the Angular routing service.
   */
  private readonly _router: Router = null;

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
    this._templateService = injector.get(TemplateService);
    this._route = injector.get(ActivatedRoute);
    this._router = injector.get(Router);
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

  /**
   * Title back button event listener.
   */
  protected titleBack(): void {
    this._router.navigate( ['/templates'] );
  }
}