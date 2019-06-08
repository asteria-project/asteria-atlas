import { Component } from '@angular/core';
import { ProcessEditorComponent } from 'src/app/edit-module/model/process-editor-component.model';
import { HeliosProcessDescriptor } from 'asteria-eos';

/**
 * The component responsible for editing config of an Asteria "file-read" process.
 */
@Component({
  selector: 'file-read-config',
  templateUrl: './file-read-config.component.html'
})
export class FileReadConfigComponent implements ProcessEditorComponent {

  /**
   * The reference to the <code>'workspace/'/<code> string.
   */
  private readonly WORKSPACE_STRING_REF: string = 'workspace/';

  /**
   * The reference to an empty string (<code>''<code>).
   */
  private readonly EMPTY_STRING_REF: string = '';

  /**
   * The reference to the file name value.
   */
  protected fileNameModel: string = null;

  /**
   * The reference to the process descriptor associated with this component.
   */
  protected process: HeliosProcessDescriptor = null;

  /**
   * Create a new <code>FileReadConfigComponent</code> instance.
   */
  constructor() {}

  /**
   * @inheritdoc
   */
  public setProcess(process: HeliosProcessDescriptor): void {
    this.process = process;
    this.fileNameModel = process.config.replace(this.WORKSPACE_STRING_REF, this.EMPTY_STRING_REF);
  }

  /**
   * Invoked each time the user input values into the "file name" field.
   * 
   * @param {Event} event the reference to the event fired by the user's action.
   */
  protected valuechange(event: Event): void {
    this.process.config = this.WORKSPACE_STRING_REF + this.fileNameModel;
  }
}