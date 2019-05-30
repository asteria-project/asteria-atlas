import { Component, Type, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentFactory, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeliosTemplate, HeliosProcessDescriptor } from 'asteria-eos';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DndDropEvent } from 'ngx-drag-drop';
import { AtlasViewComponent, BreadcrumbItem, BreadcrumbItemBuilder, } from '../../../gui-module';
import { 
  HeliosProcessDescriptorBuilder,
  HeliosTemplateBuilder,
  ProcessDefinitionCategory,
  ProcessCategory,
  ProcessDefinition,
  ProcessDefinitionService,
  ProcessType,
  TemplateService,
  ProcessConfigComponentResolver
 } from '../../../api';

/**
 * The view responsible for editing Asteria session templates.
 */
@Component({
  selector: 'template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: [ './template-editor.component.scss' ]
})
export class TemplateEditorComponent extends AtlasViewComponent implements OnInit {

  /**
   * The form used to set the name and the descrition of the template.
   */
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

  /**
   * A map that stores all Asteria process definitions.
   */
  protected processDefMap: Map<ProcessCategory, Array<ProcessDefinition>> = null;

  /**
   * The list of available Helios process categories.
   */
  protected processCategoryList: Array<ProcessDefinitionCategory> = null;

  /**
   * The current process deffinition category selected by the user.
   */
  protected processCategory: ProcessDefinitionCategory = null;

  /**
   * The list of Asteria process definitions displayed in the process list component.
   */
  protected processDefList: Array<ProcessDefinition> = null;

  /**
   * The label displayed over the submit button face.
   */
  protected submitBtnLabel: string = 'Save';
  
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
      templateName: ['', [Validators.required]],
      templateDescription: ['', null]
    });
    this.processCategoryList = new Array<ProcessDefinitionCategory>();
    this.processDefList = new Array<ProcessDefinition>();
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    const id: string = this._route.snapshot.paramMap.get('id');
    const items: Array<BreadcrumbItem> = new Array<BreadcrumbItem>();
    this.initProcessCategoryList();
    if (id) {
      this._templateService.getTemplate(id).subscribe((template: HeliosTemplate)=> {
        this.template = template;
        this.initForm();
      });
      items.push(BreadcrumbItemBuilder.build('Template Details', `/templates/${id}`));
      this.updateForm.get('templateName').disable();
    } else {
      items.push(BreadcrumbItemBuilder.build(this.title));
      this.submitBtnLabel = 'Create';
      this.template = HeliosTemplateBuilder.build();
      this.initForm();
    }
    this.breadcrumbService.setItems(items);
  }

  /**
   * Initialize the list of available process categories that can be added to a template.
   */
  protected initProcessCategoryList(): void {
    this._processDefService.getProcessDefinitionCategoryList().subscribe((catList: Array<ProcessDefinitionCategory>)=> {
      this.processCategoryList = catList;
      this.initProcessDefList();
    });
  }

  /**
   * Initialize the list of available processes that can be added to a template.
   */
  protected initProcessDefList(): void {
    this._processDefService.getProcessDefinitionList().subscribe((defList: Array<ProcessDefinition>)=> {
      this.processDefMap = new Map<ProcessCategory, Array<ProcessDefinition>>();
      defList.forEach((process: ProcessDefinition) => {
        const category: ProcessCategory = process.category;
        let defs: Array<ProcessDefinition> = this.processDefMap.get(category);
        if (!defs) {
          defs = new Array<ProcessDefinition>();
          this.processDefMap.set(category, defs);
        }
        defs.push(process);
      });
      this.initProcessCategory();
    });
  }

  /**
   * Initialize process category.
   */
  protected initProcessCategory(): void {
    this.processCategory = this.processCategoryList[0];
    this.changeProcessDefList(this.processCategory);
  }
  
  /**
   * Invoked each time the user moves an item in the process workflow.
   * 
   * @param {CdkDragDrop<string[]>} event the event associated with this user action.
   */
  protected processListOnDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.template.processes, event.previousIndex, event.currentIndex);
  }

  /**
   * Invoked each time the user adds a new process to the template workflow.
   * 
   * @param {DndDropEvent} event the event associated with this user action.
   */
  protected processListWrapperOnDrop(event: DndDropEvent): void {
    const processes: Array<HeliosProcessDescriptor> = this.template.processes;
    if (event.dropEffect === 'copy') {
      processes.push(
        HeliosProcessDescriptorBuilder.build(event.data.type)
      );
    }
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
  
  /**
   * Load the component that allows to set the config of process.
   * 
   * @param {Type<any>} compRef the reference to the component to load and display.
   */
  private loadConfigEditor(compRef: Type<any>): void {
    this.configContainer.clear();
    const factory: ComponentFactory<any> = this._factoryResolver.resolveComponentFactory(compRef);
    this.configContainer.createComponent(factory);
  }
  
  /**
   * Initialize the process update form.
   */
  private initForm(): void {
    this.updateForm.patchValue({
      templateName:         this.template.name,
      templateDescription:  this.template.description
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

  /**
   * Replace the the process list displayed in the process dropdown, according to the the specified category.
   * 
   * @param {ProcessDefinitionCategory} category the category to display in the process dropdown component.
   */
  protected changeProcessDefList(category: ProcessDefinitionCategory): void {
    this.processCategory = category;
    this.processDefList = this.processDefMap.get(this.processCategory.category);
  }
  
  /**
   * TODO: save data
   */
  protected submitForm(): void {
    const ctrl: AbstractControl = this.updateForm.get('templateName');
    ctrl.markAsDirty();
    ctrl.updateValueAndValidity();
    if (this.updateForm.valid) {
      this.template.name = ctrl.value;
      this.template.description = this.updateForm.get('templateDescription').value;
      this._templateService.createTemplate(this.template).subscribe((result: string)=> {
        // if (this._mode === InteractionMode.EDIT) {}
        this.router.navigate( ['/templates'] );
      });
    }
  }
}