import { Component, AfterViewInit, Injector, ViewChild } from '@angular/core';
import { AtlasViewComponent, BreadcrumbItemBuilder, BreadcrumbItem, ClipboardService, ClipboardItemBuilder } from '../../../gui-module';
import { WorkspaceService } from '../../../business-module';
import { HeliosFileStats } from 'asteria-eos';
import { FileExtensionUtils } from '../../util/file-extension.utils';
import { NzTreeNodeOptions, NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';
import { FileExplorerNodeUtils } from '../../util/file-explorer-node.utils';

/**
 * The view responsible for displaying the files registered in the workspace.
 */
@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: [ './file-explorer.component.scss' ]
})
export class FileExplorerComponent extends AtlasViewComponent implements AfterViewInit {

  /**
   * The reference to the navigation tree in this view.
   */
  @ViewChild(NzTreeComponent, {static: false})
  private _tree: NzTreeComponent = null;

  /**
   * The model used to render items in the tree component.
   */
  protected nodes: Array<NzTreeNodeOptions> = [
    {
      title: 'workspace',
      expanded: false,
      key: '0'
    }
  ];

  /**
   * The reference to the current node selected in the tree component.
   */
  private _currentNode: NzTreeNode = null;

  /**
   * The reference to the Atlas workspace service.
   */
  private readonly _workspace: WorkspaceService = null;
  
  /**
   * The reference to the Atlas clipboard managment service.
   */
  private readonly _clipboard: ClipboardService = null;
  
  /**
   * The reference to the path currently displayed in the file explorer.
   */
  protected dirPathModel: string = '';

  /**
   * The list of files currently displayed in the file explorer.
   */
  protected fileStatsModel: Array<HeliosFileStats> = null;

  /**
   * Indicates whether the URL import modal is displayed (<code>true</code>), or not (<code>false</code>).
   */
  protected importModalVisible: boolean = false;

  /**
   * Indicates whether the folder creation modal is displayed (<code>true</code>), or not (<code>false</code>).
   */
  protected folderModalVisible: boolean = false;

  /**
   * The URL to a file to import into the file system.
   */
  protected urlImportModel: string = null;

  /**
   * The name of the new folder to create.
   */
  protected newFolderModel: string = null;

  /**
   * Create a new <code>FileExplorerComponent</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'File Explorer';
    this.initBreadcrumb();
    this._workspace = injector.get(WorkspaceService);
    this._clipboard = injector.get(ClipboardService);
  }

  /**
   * Initialize the breadcrumb.
   */
  private initBreadcrumb(): void {
    const snapshot: BreadcrumbItem[] = this.breadcrumbService.snapshot;
    const currItem: BreadcrumbItem = BreadcrumbItemBuilder.build(this.title);
    if (snapshot) {
      this.backButtonRoute = snapshot[snapshot.length - 1].route;
      snapshot.push(currItem);
      this.breadcrumbService.setItems(snapshot);
      this.breadcrumbService.clearSnapshot();
    } else {
      this.backButtonRoute = '/workspace';
      this.breadcrumbService.setItems([
        BreadcrumbItemBuilder.build('Workspace', '/workspace'),
        currItem
      ]);
    }
  }
  
  /**
   * @inheritdoc
   */
  public ngAfterViewInit(): void {
    this.loadNode(this._tree.getTreeNodeByKey('0'));
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
  protected copyFilePath(fileName: string, path: any): void {
    this._clipboard.copyToClipboard(
      ClipboardItemBuilder.build('File path of ' + fileName, path)
    );
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
   * Return the file name for the specified file.
   * 
   * @param {HeliosFileStats} file the file for which to get the file name.
   * 
   * @returns {string} the file name for the specified file.
   */
  protected getFileName(file: HeliosFileStats): string {
    return file.isFile ? `${file.name}.${file.extention}` : file.name;
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

  /**
   * Display the modal specified by its reference.
   * 
   * @param {string} modalRef the reference to the modal to display.
   */
  protected openModal(modalRef: string): void {
    if (modalRef === 'url') {
      this.importModalVisible = true;
    } else  if (modalRef === 'folder') {
      this.folderModalVisible = true;
    }
  }

  /**
   * Handle the user's cancel action over a modal.
   * 
   * @param {string} modalRef the reference to the modal to hide.
   */
  protected handleCancel(modalRef: string): void {
    if (modalRef === 'url') {
      this.importModalVisible = false;
    } else  if (modalRef === 'folder') {
      this.folderModalVisible = false;
    }
  }

  /**
   * Invoked each time the user clicks on an item in the tree.
   * 
   * @param {Required<NzFormatEmitEvent>} event the event associated with the user's action.
   */
  protected treeEventHandler(event: Required<NzFormatEmitEvent>): void {
    const node: NzTreeNode = event.node;
    const eventName: string = event.eventName;
    if (node) {
      if (eventName === 'expand') {
        if (node.isExpanded) {
          this.loadNode(node);
        }
      } else if (eventName === 'click') {
        if (node !== this._currentNode) {
          this.loadNode(node);
        } else {
          this._currentNode.isSelected = true;
        }
      }
    }
  }

  /**
   * Load Helios files structure for the specified node.
   * 
   * @param {NzTreeNode} node the node for which to load the Helios files structure.
   */
  private loadNode(node: NzTreeNode): void {
    if (this._currentNode) {
      this._currentNode.isSelected = false;
    }
    this.dirPathModel = FileExplorerNodeUtils.getNodeDirPath(node);
    this._workspace.list(this.dirPathModel).subscribe((files: any)=> {
      const model: Array<HeliosFileStats> = files.data;
      if (model) {
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
      }
      this.fileStatsModel = model;
      FileExplorerNodeUtils.setNodeChildren(
        node,
        FileExplorerNodeUtils.buildNodeFromModel(model, 1)
      )
      node.isExpanded = true;
      if (!this._currentNode) {
        node.isSelected = true;
      }
      this._currentNode = node;
      this.setUpdatedDate();
    });
  }
}