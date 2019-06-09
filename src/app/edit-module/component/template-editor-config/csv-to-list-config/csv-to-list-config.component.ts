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
export class CsvToListConfigComponent implements ProcessEditorComponent {

  /**
   * The reference to the (<code>'undefined'<code>) string.
   */
  private readonly UNDEFINED_STRING_REF: string = 'undefined';

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
   * The reference to the item currently edited.
   */
  protected editItem: any = null;

  /**
   * Represent the initial state of the currently edited item.
   */
  private _editItemState: any = null;
  
  /**
   * Create a new <code>CsvToListConfigComponent</code> instance.
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
   * Create a new column mapper item.
   */
  protected createColsMapItem(event: MouseEvent): void {
    this.colsMapModel.unshift({ id: -1, prop: this.UNDEFINED_STRING_REF });
    this.endEdit(null);
  }
  
  /**
   * Delete the specified column mapper item.
   * 
   * @param {any} item the item to delete.
   */
  protected deleteColsMapItem(item: any): void {
    const id: number = this.colsMapModel.indexOf(item);
    this.colsMapModel.splice(id, 1);
    this.endEdit(null);
  }

  /**
   * Start the columns mapping edition process.
   * 
   * @param {any} item the column mapping item to edit.
   * @param {MouseEvent} event the event associated with the user's action responsible for starting edition.
   */
  protected startEdit(item: any, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.editItem = item;
    this._editItemState = Object.assign({}, item);
  }

  /**
   * End the columns mapping edition process.
   * 
   * @param {MouseEvent} event the event associated with the user's action responsible for ending edition.
   * @param {boolean} reset indicates whether the current item must be set with initial values (<code>true</code>), or
   *                        not (<code>false</code>).
   */
  protected endEdit(event: MouseEvent, reset: boolean = true): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!reset) {
      this.editItem.id = this._editItemState.id;
      this.editItem.prop = this._editItemState.prop;
    }
    this._editItemState = null;
    this.editItem = null;
    this.updateColsMap();
  }
  
  /**
   * Update the process columns mapping data.
   */
  private updateColsMap(): void {
    this.colsMapModel.sort((a: any, b: any)=> {
      return a.id - b.id;
    });
    this.process.config.colsMap = this.colsMapModel;
    this.colsMapModel = null;
    setTimeout(()=> {
      this.colsMapModel = this.process.config.colsMap;
    }, 0);
  }

  /**
   * Invoked each time the separator input field takes focus.
   */
  protected onSeparatorFocus(): void {
    if (this.editItem !== null) {
      this.endEdit(null);
    }
  }
}