import { Component, OnInit, Injector } from '@angular/core';
import { AtlasViewComponent, BreadcrumbItemBuilder } from '../../../gui-module';
import { WorkspaceService, CsvSeparatorType } from '../../..//business-module';
import { ActivatedRoute } from '@angular/router';
import { HeliosData, HeliosCsvPreview } from 'asteria-eos';

/**
 * The view responsible for displaying the preview of a file.
 */
@Component({
  selector: 'file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: [ './file-preview.component.scss' ]
})
export class FilePreviewComponent extends AtlasViewComponent implements OnInit {

  /**
   * The reference to the Helios workspace service.
   */
  private readonly _wsService: WorkspaceService = null;

  /**
   * The reference to the current route.
   */
  private _route: ActivatedRoute = null;

  private _useActivatedRoute: boolean = false;

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

  protected heliosCsvPreview: HeliosCsvPreview = null;

  protected previewRows: Array<Array<string>> = null;

  /**
   * Create a new <code>FilePreviewComponent</code> instance.
   * 
   * @param {Injector} injector the reference to the Angular services injector.
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.title = 'File Preview';
    this.breadcrumbService.setItems([
      BreadcrumbItemBuilder.build(this.title)
    ]);
    this._wsService = injector.get(WorkspaceService);
    this._route = injector.get(ActivatedRoute);
    this.previewRows = new Array<Array<string>>();
  }
  
  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.dirPathModel = this._route.snapshot.paramMap.get('filePath');
    if (this.dirPathModel) {
      this.previewFile();
      this._useActivatedRoute = true;
    } else {
      this.lastUpdated = Date.now();
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
      this.lastUpdated = Date.now();
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
   * 
   * @param {CsvSeparatorType} value 
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

  protected getEstimatedRowsNum(): number {
    const chunkSize: number = this.byteCount(this.heliosCsvPreview.content);
    const rowSize: number = chunkSize / 10;
    return Math.round(this.heliosCsvPreview.stats.size / rowSize) + 1;
  }

  private byteCount(input: string): number {
    const rawData: string = input.substring(input.indexOf('\n'));
    return encodeURI(rawData).split(/%..|./).length - 1;
  }
}