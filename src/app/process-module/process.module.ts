import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuiModule } from '../gui-module/gui.module';

// Module routes
import { ProcessRoutingModule } from './process-routing.module';

// Module components
import { TemplateDetailsComponent } from './component/template-details/template-details.component';
import { TemplateListComponent } from './component/template-list/template-list.component';
import { ProcessRunComponent } from './component/process-run/process-run.component';

const COMPONENTS: any[] = [
  TemplateListComponent,
  TemplateDetailsComponent,
  ProcessRunComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  entryComponents: [],
  imports: [
    FormsModule,
    GuiModule,
    ProcessRoutingModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ProcessModule { }
