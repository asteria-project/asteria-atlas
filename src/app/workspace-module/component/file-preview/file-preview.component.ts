import { Component, Injector, AfterViewInit } from '@angular/core';
import { AtlasViewComponent, BreadcrumbItemBuilder, BreadcrumbItem, ClipboardService, ClipboardItemBuilder } from '../../../gui-module';
import { WorkspaceService, CsvSeparatorType } from '../../../business-module';
import { ActivatedRoute } from '@angular/router';
import { HeliosData, HeliosCsvPreview, HeliosFileStats } from 'asteria-eos';

/**
 * The view responsible for displaying the preview of a file.
 */
@Component({
  selector: 'file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: [ './file-preview.component.scss' ]
})
export class FilePreviewComponent extends AtlasViewComponent implements AfterViewInit {

  /**
   * The reference to the Helios workspace service.
   */
  private readonly _wsService: WorkspaceService = null;

  /**
   * The reference to the current route.
   */
  private _route: ActivatedRoute = null;

  /**
   * The reference to the path currently displayed in the view.
   */
  protected dirPathModel: string = '';

  /**
   * The seperator character used to determine CSV columns.
   */
  protected separator: string = ',';

  /**
   * The reference to the separator currently used to render CSV data.
   */
  protected separatorType: CsvSeparatorType = CsvSeparatorType.COMMA;

  /**
   * The reference to the value object that contains file preview information.
   */
  protected heliosCsvPreview: HeliosCsvPreview = null;

  /**
   * The list of items that contain preview for a single CSV row.
   */
  protected previewRows: Array<Array<string>> = null;

  /**
   * The reference to the Atlas clipboard managment service.
   */
  private readonly _clipboard: ClipboardService = null;
  
  /**
   * Create a new <code>FilePreviewComponent</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'File Preview';
    this.backButtonRoute = '/workspace';
    this.initBreadcrumb();
    this._wsService = injector.get(WorkspaceService);
    this._clipboard = injector.get(ClipboardService);
    this._route = injector.get(ActivatedRoute);
    this.previewRows = new Array<Array<string>>();
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
    this.dirPathModel = this._route.snapshot.paramMap.get('filePath');
    if (this.dirPathModel) {
      this.previewFile();
    } else {
      this.setUpdatedDate();
    }
  }

  /**
   * Call the webservice to load a preview of the current CSV file.
   */
  protected previewFile(): void {
    this.heliosCsvPreview = null;
    this._wsService.csvPreview(this.dirPathModel).subscribe((preview: HeliosData<HeliosCsvPreview>)=> {
      this.heliosCsvPreview = preview.data;
      this.createDataPreview();
      this.setUpdatedDate();
    });
  }

  /**
   * Create preview data built from user input and the current CSV file.
   */
  private createDataPreview(): void {
    if (this.separator !== null && this.heliosCsvPreview !== null) {
      const rawData: string = this.heliosCsvPreview.content;
      const newPreviewRows: Array<Array<string>> = new Array<Array<string>>();
      const tmpDataArr: Array<string> = rawData.split('\n');
      tmpDataArr.forEach((item: string)=> {
        newPreviewRows.push(item.split(this.separator));
      });
      this.previewRows = newPreviewRows;
    }
  }

  /**
   * Invoked each time the user selects a new kind of separator.
   * 
   * @param {CsvSeparatorType} value the new separator selected by the user.
   */
  protected separatorSelectHandler(value: CsvSeparatorType): void {
    switch (value) {
      case CsvSeparatorType.TAB :
        this.separator = '\t';
        break;
      case CsvSeparatorType.COMMA :
        this.separator = ',';
        break;
      case CsvSeparatorType.SPACE :
        this.separator = ' ';
        break;
      case CsvSeparatorType.OTHER :
        this.separator = null;
        break;
      case CsvSeparatorType.SEMICOLON :
      default :
        this.separator = ';';
    }
    this.createDataPreview();
  }

  /**
   * Return the estimated number of rows for the current file.
   * 
   * @returns {number} the estimated number of rows for the current file.
   */
  protected getEstimatedRowsNum(): number {
    const chunkSize: number = this.byteCount(this.heliosCsvPreview.content);
    const rowSize: number = chunkSize / 10;
    return Math.round(this.heliosCsvPreview.stats.size / rowSize) + 1;
  }

  /**
   * Return the size, in bytes, of the specified input string.
   * 
   * @param {string} input the input string for which to get the size.
   * 
   * @returns {numpber} the size, in bytes, of the specified input string.
   */
  private byteCount(input: string): number {
    const rawData: string = input.substring(input.indexOf('\n'));
    return encodeURI(rawData).split(/%..|./).length - 1;
  }
  
  /**
   * Copy the content of the current file preview into the clipboard.
   */
  protected copyFileContent(): void {
    this._clipboard.copyToClipboard(
      ClipboardItemBuilder.build('CSV file preview of ' + this.getFileName(), this.heliosCsvPreview.content)
    );
  }

  /**
   * Return the name of the current file preview.
   * 
   * @returns {string} the name of the current file preview.
   */
  protected getFileName(): string {
    const file: HeliosFileStats = this.heliosCsvPreview.stats;
    return `${file.name}.${file.extention}`;
  }
}