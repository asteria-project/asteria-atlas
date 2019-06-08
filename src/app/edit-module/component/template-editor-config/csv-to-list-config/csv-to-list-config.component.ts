import { Component } from '@angular/core';
import { ProcessEditorComponent } from 'src/app/edit-module/model/process-editor-component.model';
import { HeliosProcessDescriptor } from 'asteria-eos';

/**
 * The component responsible for editing config of an Asteria "csv-to-list" process.
 */
@Component({
  selector: 'csv-to-list-config',
  templateUrl: './csv-to-list-config.component.html',
  styleUrls: [ './csv-to-list-config.component.scss' ]
})
export class CsvToListReadConfigComponent implements ProcessEditorComponent {

  /**
   * The reference to an empty string (<code>''<code>).
   */
  private readonly EMPTY_STRING_REF: string = '';

  /**
   * The reference to the file name value.
   */
  protected separatorModel: string = null;
  
  /**
   * The list of <code>CsvColumnMapper</code> objects displayed in this component.
   */
  protected colsMapModel: Array<any> = null;

  /**
   * The reference to the process descriptor associated with this component.
   */
  protected process: HeliosProcessDescriptor = null;

  /**
   * Create a new <code>CsvToListReadConfigComponent</code> instance.
   */
  constructor() {}

  /**
   * @inheritdoc
   */
  public setProcess(process: HeliosProcessDescriptor): void {
    this.process = process;
    this.separatorModel = process.config.separator;
    this.colsMapModel = process.config.colsMap || new Array<any>();
  }

  /**
   * Invoked each time the user input values into the "file name" field.
   * 
   * @param {Event} event the reference to the event fired by the user's action.
   */
  protected valuechange(event: Event): void {
    //this.process.config = this.WORKSPACE_STRING_REF + this.fileNameModel;
  }
}