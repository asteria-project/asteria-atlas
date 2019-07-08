import { Component, AfterViewInit, Injector, ViewChild } from '@angular/core';
import { AtlasViewComponent, BreadcrumbItemBuilder, BreadcrumbItem, ClipboardService, ClipboardItemBuilder, NotificationService } from '../../../gui-module';
import { WorkspaceService } from '../../../business-module';
import { HeliosFileStats, HeliosData } from 'asteria-eos';
import { FileExtensionUtils } from '../../util/file-extension.utils';
import { NzTreeNodeOptions, NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTableComponent } from 'ng-zorro-antd';
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
  private _navTree: NzTreeComponent = null;

  /**
   * The reference to the files display table in this view.
   */
  @ViewChild(NzTableComponent, {static: false})
  private _filesTable: NzTableComponent = null;

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
   * The reference to the Atlas notification service.
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
   * Store the reference to the <code>FileExtensionUtils</code> class.
   */
  protected fileUtils: any = FileExtensionUtils;

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
    this._notification = injector.get(NotificationService);
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
    this.loadNode(this._navTree.getTreeNodeByKey('0'));
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
   * Delete the specified file, or directory.
   * 
   * @param {HeliosFileStats} file the file to delete.
   */
  protected deleteFile(file: HeliosFileStats): void {
    const fileName: string = this.fileUtils.getFileName(file);
    const pathToRemove: string = this.dirPathModel + fileName;
    this._workspace.remove(pathToRemove).subscribe((result: any)=> {
      const msgType: string = file.isFile ? 'File' : 'Directory';
      this._notification.success(
        `${msgType} Remove Success`, `${msgType} "${fileName}" has been successfully removed.`
      );
      this.loadNode(this._currentNode);
    });
  }

  /**
   * Open the specified file into the preview view.
   * 
   * @param {HeliosFileStats} file the file to preview.
   */
  protected previewFile(file: HeliosFileStats): void {
    this.breadcrumbService.takeSnapshot(this.router.url);
    this.router.navigate( [`workspace/preview/${this.fileUtils.getFilePath(file)}`]) ;
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
   * Handle the user's validate action over a modal.
   * 
   * @param {string} modalRef the reference to the modal to be processed.
   */
  protected handleOk(modalRef: string): void {
    this.handleCancel(modalRef);
    if (modalRef === 'url') {
      // TODO
    } else if (modalRef === 'folder') {
      this._workspace.mkdir(this.newFolderModel).subscribe((result: any)=> {
        this._notification.success(
          `Directory Create Success`, `Directory "${this.newFolderModel}" has been successfully creates.`
        );
        this.newFolderModel = null;
        this.loadNode(this._currentNode);
      });
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

  /**
   * Sort data in the files table, according to the specified sort options.
   * 
   * @param {{ key: string; value: string }} sort the options used to sort data.
   */
  protected sortFilesHandler(sort: { key: string; value: string }): void {
    const key: string = sort.key;
    const value: string = sort.value;
    const data:  Array<HeliosFileStats> = this.fileStatsModel;
    if (key && value) {
      data.sort((a: any, b: any) => {
        let result: number = 0;
        if (value === 'ascend') {
          result = a[key!] > b[key!] ? 1 : -1;
        } else if (value === 'descend') {
          result = b[key!] > a[key!] ? 1 : -1;
        }
        return result;
      });
      this._filesTable.data = this.fileStatsModel = data;
    }
  }

  /**
   * Invoked each time the user clicks the file upload button.
   * 
   * @param {HTMLInputElement} input the reference to the file upload input.
   */
  protected handleFileInput(input: HTMLInputElement): void {
    const file: File = input.files.item(0);
    if (file) {
      this._workspace.upload(this.dirPathModel, file).subscribe((result: HeliosData<HeliosFileStats>)=> {
        this._notification.success(
          "File Upload Success", `File "${file.name}" has been successfully uploaded.`
        );
        this.loadNode(this._currentNode);
      });
      input.value = '';
    }
  }
}