import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';

// Locale
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd';

// Module components
import { AtlasViewComponent } from './component/atlas-view/atlas-view.component';
import { UpdateDateComponent } from './component/update-date/update-date.component';

registerLocaleData(en);

const COMPONENTS: any[] = [
  AtlasViewComponent,
  UpdateDateComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    ...COMPONENTS
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class GuiModule { }
