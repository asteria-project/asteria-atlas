import { Component, OnInit, Injector } from '@angular/core';
import { AtlasViewComponent, BreadcrumbItemBuilder, NotificationService } from '../../../gui-module';
import { WorkspaceService } from '../../../business-module';
import { HeliosFileStats } from 'asteria-eos';
import { FileExtensionUtils } from '../../util/file-extension.utils';

/**
 * The view responsible for displaying the files registered in the workspace.
 */
@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: [ './file-explorer.component.scss' ]
})
export class FileExplorerComponent extends AtlasViewComponent implements OnInit {

  nodes = [
    {
      title: 'parent 0',
      key: '100',
      author: 'NG ZORRO',
      children: [
        { title: 'leaf 0-0', key: '1000', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 0-1', key: '1001', author: 'NG ZORRO', isLeaf: true }
      ]
    },
    {
      title: 'parent 1',
      key: '101',
      author: 'NG ZORRO',
      children: [
        { title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true }
      ]
    }
  ];

  /**
   * The reference to the Atlas workspace service.
   */
  private readonly _workspace: WorkspaceService = null;
  
  /**
   * The reference to the Atlas notifications service.
   */
  private readonly _notification: NotificationService = null;
    
  /**
   * The reference to the path currently displayed in the file explorer.
   */
  protected dirPathModel: string = '';

  /**
   * The list of files currently displayed in the file explorer.
   */
  protected fileStatsModel: Array<HeliosFileStats> = null;

  /**
   * Create a new <code>FileExplorerComponent</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'File Explorer';
    this.backButtonRoute = '/workspace';
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build('Workspace', '/workspace'),
      BreadcrumbItemBuilder.build(this.title)
    ]);
    this._workspace = injector.get(WorkspaceService);
    this._notification = injector.get(NotificationService);
  }
  
  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this._workspace.list('').subscribe((files: any)=> {
      const model: Array<HeliosFileStats> = files.data;
      model.sort((a: HeliosFileStats, b: HeliosFileStats)=> {
        let result: number = 0;
        if (a.isFile !== b.isFile) {
          result = a.isFile === false ? -1 : 1;
        } else {
          if (a.name > b.name) {
            result = -1;
          }
          if (b.name > a.name) {
            result = 1;
          }
        }
        return result;
      });
      this.fileStatsModel = model;
      this.lastUpdated = Date.now();
    });
  }

  /**
   * Return the icon reference to be associated with the extention of the specified file.
   * 
   * @param {HeliosFileStats} file the file for which to get the icon.
   * 
   * @returns {string} the icon reference to be associated with the extention of the specified file.
   */
  public getFileIcon(file: HeliosFileStats): string {
    return FileExtensionUtils.getIcon(file);
  }

  /**
   * Copy the specified file path into the clipboard.
   * 
   * @param {any} path the file path to copy into the clipboard.
   */
  protected copyFilePath(path: any): void {
    try {
      document.addEventListener('copy', (event: ClipboardEvent) => {
        event.clipboardData.setData('text/plain', path);
        event.preventDefault();
        document.removeEventListener('copy', null);
        this._notification.success(
          'Copy Success',
          `Path copied to clipboard: "${path}"`
        );
      });
      document.execCommand('copy');
    } catch (e) {
      this._notification.success(
        'Copy Error',
        e
      )
    }
  }

  /**
   * Return the full path for the specified file.
   * 
   * @param {HeliosFileStats} file the file for which to get the full path.
   * 
   * @returns {string} the full path for the specified file.
   */
  protected getFilePath(file: HeliosFileStats): string {
    return `${file.path}${file.name}.${file.extention}`;
  }
  
  /**
   * Delete the specified file, or directory.
   * 
   * @param {HeliosFileStats} file the file to delete.
   */
  protected deleteFile(file: HeliosFileStats): void {
  }

  /**
   * Open the specified file into the preview view.
   * 
   * @param {HeliosFileStats} file the file to preview.
   */
  protected previewFile(file: HeliosFileStats): void {
    this.router.navigate( [`workspace/preview/${this.getFilePath(file)}`]) ;
  }
}