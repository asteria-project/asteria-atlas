import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

/**
 * The component responsible for editing config of an Asteria "file-read" process.
 */
@Component({
  selector: 'file-read-config',
  templateUrl: './file-read-config.component.html',
  styleUrls: [ './file-read-config.component.scss' ]
})
export class FileReadConfigComponent implements OnInit {

  /**
   * Create a new <code>FileReadConfigComponent</code> instance.
   * 
   * @param {FormBuilder} _fb the reference to the <code>FormBuilder</code> service injected by angular.
   */
  constructor(private _fb: FormBuilder) {}

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    /*this.validateForm = this._fb.group({
      templateName: [null, [Validators.required]],
      remember: [true]
    });*/
  }
  
  protected submitForm(): void {
    /*for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }*/
  }
}