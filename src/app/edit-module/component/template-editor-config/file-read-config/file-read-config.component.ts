import { Component, Injector } from '@angular/core';
import { ProcessEditorComponent } from '../../../model/process-editor-component.model';
import { HeliosProcessDescriptor } from 'asteria-eos';
import { AtlasViewComponent } from '../../../../gui-module';

/**
 * The component responsible for editing config of an Asteria "file-read" process.
 */
@Component({
  selector: 'file-read-config',
  templateUrl: './file-read-config.component.html',
  styleUrls: ['./file-read-config.component.scss']
})
export class FileReadConfigComponent extends AtlasViewComponent implements ProcessEditorComponent {

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
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
  }

  /**
   * @inheritdoc
   */
  public setProcess(process: HeliosProcessDescriptor): void {
    this.process = process;
    const processFileName: string = process.config || this.EMPTY_STRING_REF;
    this.fileNameModel = processFileName.replace(this.WORKSPACE_STRING_REF, this.EMPTY_STRING_REF);
  }

  /**
   * Invoked each time the user input values into the "file name" field.
   * 
   * @param {Event} event the reference to the event fired by the user's action.
   */
  protected valuechange(event: Event): void {
    this.process.config = this.WORKSPACE_STRING_REF + this.fileNameModel;
  }

  /**
   * Return a boolean value that indicates whether file preview is allowed (<code>true</code>), or not
   * (<code>false</code>).
   * 
   * @returns {boolean} <code>true</code> whether file preview is allowed; false otherwise.
   */
  protected allowPreview(): boolean {
    return this.fileNameModel && this.fileNameModel.length > 4;
  }

  /**
   * Navigate to the specified route.
   * 
   * @param {string} route the route where to navigate to.
   */
  protected navigateTo(route: string): void {
    if (route === 'explorer') {
      this.breadcrumbService.takeSnapshot(this.router.url);
      this.router.navigate( [`/workspace/${route}`] );
    } else if (route === 'preview' && this.allowPreview) {
      this.breadcrumbService.takeSnapshot(this.router.url);
      this.router.navigate( [`/workspace/${route}/${this.fileNameModel}`] );
    }
  }
}