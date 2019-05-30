import { NgModule } from '@angular/core';
import { GuiModule } from '../gui-module/gui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DndModule } from 'ngx-drag-drop';

// Module routes
import { EditRoutingModule } from './edit-routing.module';

// Module services
import { ProcessConfigComponentResolver } from './service/template/process-config-component.resolver';

// Module components
import { TemplateEditorComponent } from './component/template-editor/template-editor.component';
import { FileReadConfigComponent } from './component/template-editor-config/file-read-config/file-read-config.component';


const COMPONENTS: any[] = [
  TemplateEditorComponent
];

const ENTRY_COMPONENTS: any[] = [
  FileReadConfigComponent
];

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
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    DndModule,
    EditRoutingModule
  ],
  exports: [
    GuiModule,
    ...COMPONENTS,
    ...ENTRY_COMPONENTS
  ],
  providers: [
    { provide: ProcessConfigComponentResolver, useClass: ProcessConfigComponentResolver }
  ]
})
export class EditModule { }
