import { Component, Type, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentFactory, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProcessConfigComponentResolver } from '../../../api/service/process-config-component.resolver';
import { AtlasViewComponent } from '../../layout/atlas-view/atlas-view.component';
import { BreadcrumbItemBuilder } from '../../..//api/util/breadcrumb/breadcrumb-item.builder';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/api/service/template/template.service';
import { HeliosTemplate, HeliosProcessDescriptor } from 'asteria-eos';
import { ProcessType } from 'src/app/api/business/process-type.enum';

/**
 * The view responsible for editing Asteria session templates.
 */
@Component({
  selector: 'template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: [ './template-editor.component.scss' ]
})
export class TemplateEditorComponent extends AtlasViewComponent implements OnInit {

  validateForm: FormGroup;

  /**
   * The template edited in this view.
   */
  protected template: HeliosTemplate = null;

  /**
   * The reference to the HTML element where config component as are loaded.
   */
  @ViewChild('configContainer', { read: ViewContainerRef })
  protected configContainer: ViewContainerRef = null;

  /**
   * The reference to the process object currently edited.
   */
  protected currentProcess: HeliosProcessDescriptor = null;

  /**
   * The reference to the <code>FormBuilder</code> service injected by Angular.
   */
  private _fb: FormBuilder = null;

  /**
   * The reference to the <code>ComponentFactoryResolver</code> service injected by Angular.
   */
  private _factoryResolver: ComponentFactoryResolver = null;

  /**
   * The reference to the <code>ProcessConfigComponentResolver</code> service injected by Angular.
   */
  private _configCompResolver: ProcessConfigComponentResolver = null;

  /**
   * The reference to the current route.
   */
  private _route: ActivatedRoute = null;

  /**
   * The reference to the template service.
   */
  private readonly _templateService: TemplateService = null;

  /**
   * Create a new <code>TemplateEditorComponent</code> instance.
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'Template Editor';
    this._templateService = injector.get(TemplateService);
    this._fb = injector.get(FormBuilder);
    this._route = injector.get(ActivatedRoute);
    this._factoryResolver = injector.get(ComponentFactoryResolver);
    this._configCompResolver = injector.get(ProcessConfigComponentResolver);
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build(this.title)
    ]);
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    const id: string = this._route.snapshot.paramMap.get('id');
    this.validateForm = this._fb.group({
      templateName: ['', [Validators.required]],
      remember: [true]
    });
    if (id) {
      this._templateService.getTemplate(id).subscribe((template: HeliosTemplate)=> {
        this.template = template;
        this.initForm();
      });
    }
  }
  
  protected submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  protected dropProcess(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.template.processes, event.previousIndex, event.currentIndex);
  }

  /**
   * Start edition for the specified process reference.
   * 
   * @param {ProcessTemplate} process the refrence to the process to edit.
   */
  protected editProcess(process: HeliosProcessDescriptor): void {
    this.currentProcess = process;
    const compRef: Type<any> = this._configCompResolver.getComponent(process.type as ProcessType);
    this.loadConfigEditor(compRef);
  }
  
  /**
   * Remove the specified process reference from the workflow.
   * 
   * @param {ProcessTemplate} process the refrence to the process to remove.
   */
  protected deleteProcess(process: HeliosProcessDescriptor): void {
    const id: number = this.template.processes.findIndex((value: HeliosProcessDescriptor)=> {
      return value === process;
    });
    this.template.processes.splice(id, 1);
    if (this.currentProcess && this.currentProcess === process) {
      this.currentProcess = null;
      this.configContainer.clear();
    }
  }
  
  private loadConfigEditor(compRef: Type<any>): void {
    this.configContainer.clear();
    const factory: ComponentFactory<any> = this._factoryResolver.resolveComponentFactory(compRef);
    this.configContainer.createComponent(factory);
  }
  
  /**
   * Initialize the update form.
   */
  private initForm(): void {
    this.validateForm.patchValue({
      templateName: this.template.name
    });
  }
}