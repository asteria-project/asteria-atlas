import { Component } from '@angular/core';
import { ProcessEditorComponent } from 'src/app/edit-module/model/process-editor-component.model';
import { HeliosProcessDescriptor } from 'asteria-eos';

/**
 * A development component responsible for displaying empty message.
 */
@Component({
  selector: 'no-config',
  templateUrl: './no-config.component.html'
})
export class NoConfigComponent implements ProcessEditorComponent {

  /**
   * Create a new <code>NoConfigComponent</code> instance.
   */
  constructor() {}
  
  /**
   * @inheritdoc
   */
  public setProcess(process: HeliosProcessDescriptor): void {
    console.log(process)
  }
}