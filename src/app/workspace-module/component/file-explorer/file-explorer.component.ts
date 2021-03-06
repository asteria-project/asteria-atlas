import { Component, AfterViewInit, Injector, ViewChild, OnInit } from '@angular/core';
import { AtlasViewComponent, BreadcrumbItemBuilder, BreadcrumbItem, ClipboardService, ClipboardItemBuilder, NotificationService, FileSaverService } from '../../../gui-module';
import { WorkspaceService } from '../../../business-module';
import { HeliosFileStats, HeliosData } from 'asteria-eos';
import { FileUtils } from '../../util/file.utils';
import { NzTreeNodeOptions, NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTableComponent } from 'ng-zorro-antd';
import { FileExplorerNodeUtils } from '../../util/file-explorer-node.utils';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormUtils } from '../../../gui-module/util/form/form-utils';
import { FileExplorerModalType } from '../../enum/file-explorer-modal-type.enum';

/**
 * The view responsible for displaying the files registered in the workspace.
 */
@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: [ './file-explorer.component.scss' ]
})
export class FileExplorerComponent extends AtlasViewComponent implements OnInit, AfterViewInit {

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
  public nodes: Array<NzTreeNodeOptions> = [
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
   * The reference to the Atlas file saving service.
   */
  private readonly _saveService: FileSaverService = null;

  /**
   * The reference to the Angular for builder.
   */
  private readonly _fb: FormBuilder = null;

  /**
   * The reference to the path currently displayed in the file explorer.
   */
  public dirPathModel: string = '';

  /**
   * The list of files currently displayed in the file explorer.
   */
  public fileStatsModel: Array<HeliosFileStats> = null;

  /**
   * Indicates whether the URL import modal is displayed (<code>true</code>), or not (<code>false</code>).
   */
  public importModalVisible: boolean = false;

  /**
   * Indicates whether the folder creation modal is displayed (<code>true</code>), or not (<code>false</code>).
   */
  public folderModalVisible: boolean = false;

  /**
   * Indicates whether the file renaming modal is displayed (<code>true</code>), or not (<code>false</code>).
   */
  public renameModalVisible: boolean = false;

  /**
   * Store the reference to the <code>FileUtils</code> class.
   */
  protected fileUtils: any = FileUtils;

  /**
   * The reference to the from group that allows to enter folder names.
   */
  public createFolderForm: FormGroup = null;

  /**
   * The reference to the from group that allows to rename items.
   */
  public renameItemForm: FormGroup = null;

  /**
   * Store the value of the current file when the user invokes the file rename feature.
   */
  private _oldFileName: string = null;

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
    this._saveService = injector.get(FileSaverService);
    this._fb = injector.get(FormBuilder);
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
  public ngOnInit(): void {
    this.createFolderForm = this._fb.group({
      newFolder: [null, [Validators.required]]
    });
    this.renameItemForm = this._fb.group({
      newName: [null, [Validators.required]]
    });
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
    const pathToRemove: string = FileUtils.joinPath(this.dirPathModel, fileName);
    this._workspace.remove(pathToRemove).subscribe((result: any)=> {
      const msgType: string = file.isFile ? 'File' : 'Directory';
      this._notification.success(
        `${msgType} Remove Success`, `${msgType} "${fileName}" has been successfully removed.`
      );
      this.loadNode(this._currentNode);
    });
  }

  /**
   * Open a modal to rename the specified file.
   * 
   * @param {HeliosFileStats} file the file to rename.
   */
  protected renameFile(file: HeliosFileStats): void {
    this._oldFileName = this.fileUtils.getFileName(file)
    FormUtils.setFieldValue(this.renameItemForm, 'newName', this._oldFileName);
    this.openModal(FileExplorerModalType.RENAME);
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
   * Download the specified file.
   * 
   * @param {HeliosFileStats} file the file to download.
   */
  protected downloadFile(file: HeliosFileStats): void {
    const fileName: string = this.fileUtils.getFileName(file);
    const pathToDownload: string = FileUtils.joinPath(this.dirPathModel, fileName);
    this._workspace.download(pathToDownload).subscribe((response: any)=> {
      const blob: Blob = new Blob([response.body], { type: response.headers.get('Content-Type') });
      this._saveService.saveBlob(blob, this.fileUtils.getFileName(file));
    });
  }
  

  /**
   * Display the modal specified by its reference.
   * 
   * @param {FileExplorerModalType} modalRef the reference to the modal to display.
   */
  protected openModal(modalRef: FileExplorerModalType): void {
    if (modalRef === FileExplorerModalType.URL) {
      this.importModalVisible = true;
    } else  if (modalRef === FileExplorerModalType.FOLDER) {
      this.folderModalVisible = true;
    } else  if (modalRef === FileExplorerModalType.RENAME) {
      this.renameModalVisible = true;
    }
  }

  /**
   * Handle the user's cancel action over a modal.
   * 
   * @param {FileExplorerModalType} modalRef the reference to the modal to hide.
   */
  public handleModalCancel(modalRef: FileExplorerModalType | string): void {
    if (modalRef === FileExplorerModalType.URL) {
      this.importModalVisible = false;
    } else  if (modalRef === FileExplorerModalType.FOLDER) {
      this.folderModalVisible = false;
      FormUtils.reset(this.createFolderForm);
    } else  if (modalRef === FileExplorerModalType.RENAME) {
      this.renameModalVisible = false;
      FormUtils.reset(this.renameItemForm);
      this._oldFileName = null;
    }
  }

  /**
   * Handle the user's validate action over a modal.
   * 
   * @param {FileExplorerModalType} modalRef the reference to the modal to be processed.
   */
  public handleModalOk(modalRef: FileExplorerModalType | string): void {
    if (modalRef === FileExplorerModalType.RENAME) {
      if (this.renameItemForm.valid) {
        const newPathName: string = FormUtils.getFieldValue(this.renameItemForm, 'newName');
        const oldPath: string = FileUtils.joinPath(this.dirPathModel, this._oldFileName);
        const newPath: string = FileUtils.joinPath(this.dirPathModel, newPathName);
        this._workspace.rename(oldPath, newPath).subscribe((result: any)=> {
          this._notification.success(
            `Rename Success`, `Element "${this._oldFileName}" has been successfully renamed.`
          );
          this.loadNode(this._currentNode);
          this._oldFileName = null;
        });
      }
    } else if (modalRef === FileExplorerModalType.FOLDER) {
      if (this.createFolderForm.valid) {
        const newFolderName: string = FormUtils.getFieldValue(this.createFolderForm, 'newFolder');
        const pathTocreate: string = FileUtils.joinPath(this.dirPathModel, newFolderName);
        this._workspace.mkdir(pathTocreate).subscribe((result: any)=> {
          this._notification.success(
            `Directory Create Success`, `Directory "${newFolderName}" has been successfully created.`
          );
          this.loadNode(this._currentNode);
        });
      } else {
        this.folderModalVisible = true;
        FormUtils.markAllAsTouched(this.createFolderForm);
      }
    } else if (modalRef === FileExplorerModalType.URL) {
      // TODO
    }
    this.handleModalCancel(modalRef);
  }

  /**
   * Invoked each time the user clicks on an item in the tree.
   * 
   * @param {Required<NzFormatEmitEvent>} event the event associated with the user's action.
   */
  public treeEventHandler(event: Required<NzFormatEmitEvent>): void {
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
      const model: Array<HeliosFileStats> = files ? files.data : null;
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
  public handleFileInput(input: HTMLInputElement): void {
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

  /**
   * Returns the path to the current directory.
   * 
   * @returns {string} the path to the current directory.
   */
  protected getCurrentDirPath(): string {
    const finalSlash: string = this.dirPathModel && this.dirPathModel.length !== 0 ? '/' : '';
    return `workspace/${this.dirPathModel}${finalSlash}`;
  }
}