import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DndModule } from 'ngx-drag-drop';
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
import { TemplateDetailsComponent } from './component/templates/template-details/template-details.component';

// Services
import { TemplateService } from './api/service/template/template.service';
import { ProcessConfigComponentResolver } from './api/service/process-config-component.resolver';
import { ProcessDefinitionService } from './api/service/config/process-definition.service';
import { BreadcrumbService } from './api/service/ui/breadcrumb.service';

import { NotificationService } from './api/service/ui/notification.service';
// Config components
import { FileReadConfigComponent } from './component/template-config/file-read-config/file-read-config.component';
import { AtlasViewComponent } from './component/layout/atlas-view/atlas-view.component';

registerLocaleData(en);

const COMPONENTS: any[] = [
  AppComponent,
  AtlasViewComponent,
  // Main app views
  AtlasContainerComponent,
  SplashScreenComponent,
  EventListComponent,
  // Job views
  JobEditorComponent,
  JobListComponent,
  // Template views
  TemplateListComponent,
  TemplateDetailsComponent,
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
    DragDropModule,
    DndModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: BreadcrumbService, useClass: BreadcrumbService },
    { provide: NotificationService, useClass: NotificationService },
    { provide: ProcessDefinitionService, useClass: ProcessDefinitionService },
    { provide: ProcessConfigComponentResolver, useClass: ProcessConfigComponentResolver },
    { provide: TemplateService, useClass: TemplateService },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
