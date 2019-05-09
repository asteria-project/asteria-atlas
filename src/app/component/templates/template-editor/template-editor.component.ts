import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentFactory } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ProcessTemplate } from 'src/app/api/business/process-template.model';
import { FileReadConfigComponent } from '../../template-config/file-read-config/file-read-config.component';
import { ProcessConfigComponentResolver } from 'src/app/api/service/process-config-component.resolver';

/**
 * The view responsible for editing Asteria session templates.
 */
@Component({
  selector: 'template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: [ './template-editor.component.scss' ]
})
export class TemplateEditorComponent implements OnInit {

  protected processList: Array<ProcessTemplate> = [
    { id: '5e348d2e-9a56-422c-a956-c839cbfa7d51', name: 'Read File', compRef: 'read-file' },
    { id: '20f33140-36af-4478-af35-926c3d3c2b7c', name: 'CSV to List', compRef: 'csv-to-list' },
    { id: 'e2a16303-6ae4-45a3-8ce0-1316d6ac09b0', name: 'Filter', compRef: 'filter' },
    { id: 'efc06bce-d2a6-48e9-9ccc-44990b165475', name: 'List to CSV', compRef: 'list-to-csv' },
    { id: '4b9c1790-b45b-4ae6-9989-291c4cd23591', name: 'Write File', compRef: 'write-file' }
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
   * Create a new <code>TemplateEditorComponent</code> instance.
   * 
   * @param {FormBuilder} _fb the reference to the <code>FormBuilder</code> service injected by angular.
   * @param {ComponentFactoryResolver} _factoryResolver the reference to the <code>ComponentFactoryResolver</code>
   *                                                    service injected by angular.
   * @param {ProcessConfigComponentResolver} _configCompResolver the reference to the 
   *                                                             <code>ProcessConfigComponentResolver</code> service
   *                                                             injected by angular.
   */
  constructor(private _fb: FormBuilder,
              private _factoryResolver: ComponentFactoryResolver,
              private _configCompResolver: ProcessConfigComponentResolver) {}

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
    const compRef: any = this._configCompResolver.getComponent(process.compRef);
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
  
  private loadConfigEditor(compRef: any): void {
    this.configContainer.clear();
    const factory: ComponentFactory<any> = this._factoryResolver.resolveComponentFactory(compRef);
    this.configContainer.createComponent(factory);
  }
}