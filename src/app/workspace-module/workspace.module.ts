import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuiModule } from '../gui-module/gui.module';
import { BusinessModule } from '../business-module/business.module';

// Module routes
import { WorkspaceRoutingModule } from './workspace-routing.module';

// Module components
import { FileExplorerComponent } from './component/file-explorer/file-explorer.component';

const COMPONENTS: any[] = [
  FileExplorerComponent
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
    BusinessModule,
    FormsModule,
    ReactiveFormsModule,
    WorkspaceRoutingModule
  ],
  exports: [
    GuiModule,
    ...COMPONENTS,
    ...ENTRY_COMPONENTS
  ],
  providers: []
})
export class WorkspaceModule { }
