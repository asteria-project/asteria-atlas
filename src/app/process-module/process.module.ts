import { NgModule } from '@angular/core';
import { GuiModule } from '../gui-module/gui.module';

// Module routes
import { ProcessRoutingModule } from './process-routing.module';

// Module components
import { TemplateDetailsComponent } from './component/template-details/template-details.component';
import { TemplateListComponent } from './component/template-list/template-list.component';

const COMPONENTS: any[] = [
  TemplateListComponent,
  TemplateDetailsComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  entryComponents: [],
  imports: [
    GuiModule,
    ProcessRoutingModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ProcessModule { }
