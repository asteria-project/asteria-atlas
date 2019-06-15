import { Component, OnInit, Injector } from '@angular/core';
import { AtlasViewComponent, BreadcrumbItemBuilder } from '../../../gui-module';
import { CommonChar } from 'asteria-gaia';
import { WorkspaceService } from 'src/app/business-module';

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
   * The reference to the path currently displayed in the view.
   */
  protected dirPathModel: string = CommonChar.EMPTY;

  
  protected separator: string = ';';

  protected rawData: string = null;

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
    this.previewRows = new Array<Array<string>>();
  }
  
  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.dirPathModel = 'worldcitiespop.csv';
    this._wsService.csvPreview(this.dirPathModel).subscribe((preview: string)=> {
      this.rawData = preview;
      this.createDataPreview();
      this.lastUpdated = Date.now();
    });
  }

  private createDataPreview(): void {
    const tmpDataArr: Array<string> = this.rawData.split('\n');
    tmpDataArr.forEach((item: string)=> {
      this.previewRows.push(item.split(this.separator));
    });
  }
}