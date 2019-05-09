import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

/**
 * The view responsible for editing Asteria session templates.
 */
@Component({
  selector: 'template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: [ './template-editor.component.scss' ]
})
export class TemplateEditorComponent implements OnInit {

  protected processList: Array<any> = [
    { name: 'Read File' },
    { name: 'CSV to List' },
    { name: 'Filter' },
    { name: 'List to CSV' },
    { name: 'Write File' }
  ];

  validateForm: FormGroup;


  constructor(private _fb: FormBuilder) {}

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
}