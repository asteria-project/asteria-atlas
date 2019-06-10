import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';

// Locale
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd';

// Module components
import { AtlasViewComponent } from './component/atlas-view/atlas-view.component';
import { UpdateDateComponent } from './component/update-date/update-date.component';

// Module pipes
import { FileSizePipe } from './util/pipe/file-size.pipe';

registerLocaleData(en);

const COMPONENTS: any[] = [
  AtlasViewComponent,
  UpdateDateComponent
];

const PIPES: any[] = [
  FileSizePipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    ...COMPONENTS,
    ...PIPES
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class GuiModule { }
