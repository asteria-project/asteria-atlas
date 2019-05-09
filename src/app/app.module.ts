import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtlasContainerComponent } from './component/layout/atlas-container/atlas-container.component';
import { SplashScreenComponent } from './component/layout/splash-screen/splash-screen.component';
import { JobEditorComponent } from './component/jobs/job-editor/job-editor.component';
import { JobListComponent } from './component/jobs/job-list/job-list.component';
import { TemplateListComponent } from './component/templates/template-list/template-list.component';
import { EventListComponent } from './component/events/event-list/event-list.component';
import { TemplateEditorComponent } from './component/templates/template-editor/template-editor.component';

// Services
import { ProcessConfigComponentResolver } from './api/service/process-config-component.resolver';

// Config components
import { FileReadConfigComponent } from './component/template-config/file-read-config/file-read-config.component';



registerLocaleData(en);

const COMPONENTS: any[] = [
  AppComponent,
    AtlasContainerComponent,
    SplashScreenComponent,
    JobEditorComponent,
    JobListComponent,
    TemplateListComponent,
    EventListComponent,
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
  entryComponents: [ ...ENTRY_COMPONENTS ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: ProcessConfigComponentResolver, useClass: ProcessConfigComponentResolver }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
