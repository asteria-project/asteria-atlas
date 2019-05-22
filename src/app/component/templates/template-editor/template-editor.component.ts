import { Component, Type, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentFactory, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProcessConfigComponentResolver } from '../../../api/service/process-config-component.resolver';
import { AtlasViewComponent } from '../../layout/atlas-view/atlas-view.component';
import { BreadcrumbItemBuilder } from '../../../api/util/breadcrumb/breadcrumb-item.builder';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from '../../../api/service/template/template.service';
import { HeliosTemplate, HeliosProcessDescriptor } from 'asteria-eos';
import { ProcessType } from '../../../api/business/process-type.enum';
import { BreadcrumbItem } from '../../../api/util/breadcrumb/breadcrumb-item.model';
import { ProcessDefinitionService } from '../../../api/service/config/process-definition.service';
import { ProcessDefinition } from '../../../api/business/process-definition.model';
import { ProcessCategory } from '../../../api/business/process-category.enum';

/**
 * The view responsible for editing Asteria session templates.
 */
@Component({
  selector: 'template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: [ './template-editor.component.scss' ]
})
export class TemplateEditorComponent extends AtlasViewComponent implements OnInit {

  protected updateForm: FormGroup = null;

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

  protected processDefMap: any = null;

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
   * The reference to the process definition service.
   */
  private readonly _processDefService: ProcessDefinitionService = null;

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
    this._processDefService = injector.get(ProcessDefinitionService);
    this.updateForm = this._fb.group({
      templateName: ['', [Validators.required]]
    });
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    const id: string = this._route.snapshot.paramMap.get('id');
    const items: Array<BreadcrumbItem> = new Array<BreadcrumbItem>();
    this._processDefService.getProcessDefinitionList().subscribe((defList: Array<ProcessDefinition>)=> {
      this.processDefMap = {};
      defList.forEach((process: ProcessDefinition) => {
        const category: ProcessCategory = process.category;
        let defs: Array<ProcessDefinition> = this.processDefMap[category]
        if (!defs) {
          defs = new Array<ProcessDefinition>();
          this.processDefMap[category] = defs;
        }
        defs.push(process);
      });
    });
    if (id) {
      this._templateService.getTemplate(id).subscribe((template: HeliosTemplate)=> {
        this.template = template;
        this.initForm();
      });
      items.push(BreadcrumbItemBuilder.build('Template Details', `/templates/${id}`));
      this.updateForm.get('templateName').disable();
    } else {
      items.push(BreadcrumbItemBuilder.build(this.title));
    }
    this.breadcrumbService.setItems(items);
  }
  
  protected submitForm(): void {
    const ctrl: any = this.updateForm.controls[0];
    ctrl.markAsDirty();
    ctrl.updateValueAndValidity();
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
    this.updateForm.patchValue({
      templateName: this.template.name
    });
  }

  /**
   * Return a boolean that indicates whether the update form is valid (<code>false</code>), or not (<code>true</code>).
   * 
   * @returns {boolean} <code>false</code> whether the update form is valid; <code>true</code> otherwise.
   */
  protected isFormInValid(): boolean {
    const crtl: any = this.updateForm.get('templateName');
    return !crtl.disabled && (crtl.invalid && (crtl.dirty || crtl.touched));
  }
}