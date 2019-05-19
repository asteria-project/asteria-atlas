import { Component, Type, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentFactory, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProcessTemplate } from '../../../api/business/process-template.model';
import { ProcessConfigComponentResolver } from '../../../api/service/process-config-component.resolver';
import { ProcessRef } from '../../../api/business/process-ref.enum';
import { AtlasViewComponent } from '../../layout/atlas-view/atlas-view.component';
import { BreadcrumbItemBuilder } from '../../..//api/util/breadcrumb/breadcrumb-item.builder';

/**
 * The view responsible for editing Asteria session templates.
 */
@Component({
  selector: 'template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: [ './template-editor.component.scss' ]
})
export class TemplateEditorComponent extends AtlasViewComponent implements OnInit {

  protected processList: Array<ProcessTemplate> = [
    { id: '5e348d2e-9a56-422c-a956-c839cbfa7d51', name: 'Read File', ref: ProcessRef.READ_FILE },
    { id: '20f33140-36af-4478-af35-926c3d3c2b7c', name: 'CSV to List', ref: ProcessRef.CSV_TO_LIST },
    { id: 'e2a16303-6ae4-45a3-8ce0-1316d6ac09b0', name: 'Filter', ref: ProcessRef.FILTER },
    { id: 'efc06bce-d2a6-48e9-9ccc-44990b165475', name: 'List to CSV', ref: ProcessRef.LIST_TO_CSV },
    { id: '4b9c1790-b45b-4ae6-9989-291c4cd23591', name: 'Write File', ref: ProcessRef.WRITE_FILE }
  ];

  validateForm: FormGroup;

  /**
   * The reference to the HTML element where config component as are loaded.
   */
  @ViewChild('configContainer', { read: ViewContainerRef })
  protected configContainer: ViewContainerRef = null;

  /**
   * The reference to the template reference object currently edited.
   */
  protected currentProcess: ProcessTemplate = null;

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
   * Create a new <code>TemplateEditorComponent</code> instance.
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'Template Editor';
    this._fb = injector.get(FormBuilder);
    this._configCompResolver = injector.get(ComponentFactoryResolver);
    this._configCompResolver = injector.get(ProcessConfigComponentResolver);
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build(this.title)
    ]);
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.validateForm = this._fb.group({
      templateName: [null, [Validators.required]],
      remember: [true]
    });
  }
  
  protected submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  protected dropProcess(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.processList, event.previousIndex, event.currentIndex);
  }

  /**
   * Start edition for the specified process reference.
   * 
   * @param {ProcessTemplate} process the refrence to the process to edit.
   */
  protected editProcess(process: ProcessTemplate): void {
    this.currentProcess = process;
    const compRef: Type<any> = this._configCompResolver.getComponent(process.ref);
    this.loadConfigEditor(compRef);
  }
  
  /**
   * Remove the specified process reference from the workflow.
   * 
   * @param {ProcessTemplate} process the refrence to the process to remove.
   */
  protected deleteProcess(process: ProcessTemplate): void {
    const id: number = this.processList.findIndex((value: ProcessTemplate)=> {
      return value.id === process.id;
    });
    this.processList.splice(id, 1);
    if (this.currentProcess && this.currentProcess.id === process.id) {
      this.currentProcess = null;
      this.configContainer.clear();
    }
  }
  
  private loadConfigEditor(compRef: Type<any>): void {
    this.configContainer.clear();
    const factory: ComponentFactory<any> = this._factoryResolver.resolveComponentFactory(compRef);
    this.configContainer.createComponent(factory);
  }
}