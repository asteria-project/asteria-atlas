import { Component, Injector, OnInit } from '@angular/core';
import { HeliosTemplate } from 'asteria-eos';
import { TemplateService } from '../../../api/service/template.service';
import { Router } from '@angular/router';

/**
 * The view responsible for displaying the list of Asteria session templates.
 */
@Component({
  selector: 'template-list',
  templateUrl: './template-list.component.html'
})
export class TemplateListComponent implements OnInit {

  /**
   * The reference to the template service.
   */
  private readonly _templateService: TemplateService = null;

  /**
   * The reference to the Angular routing service.
   */
  private readonly _router: Router = null;

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
    this._templateService = injector.get(TemplateService);
    this._router = injector.get(Router);
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this._templateService.getTemplates().subscribe((templates: Array<HeliosTemplate>)=> {
      this.templateList = templates;
    });
  }

  /**
   * Invoked each time the user selects a template in the list.
   * 
   * @param {HeliosTemplate} template the template selected by the user.
   */
  protected selectTemplate(template: HeliosTemplate): void {
    this._router.navigate( [`/templates/${template.id}`] );
  }
  
  /**
   * Title back button event listener.
   */
  protected titleBack(): void {
    this._router.navigate( [''] );
  }
}