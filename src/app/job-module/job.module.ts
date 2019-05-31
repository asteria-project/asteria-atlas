import { NgModule } from '@angular/core';
import { GuiModule } from '../gui-module/gui.module';

// Module routes
import { JobRoutingModule } from './job-routing.module';

// Module components
import { JobListComponent } from './component/job-list/job-list.component';

const COMPONENTS: any[] = [
  JobListComponent
];

const ENTRY_COMPONENTS: any[] = [];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...ENTRY_COMPONENTS
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ],
  imports: [
    GuiModule,
    JobRoutingModule
  ],
  exports: [
    GuiModule,
    ...COMPONENTS,
    ...ENTRY_COMPONENTS
  ],
  providers: []
})
export class JobModule { }
