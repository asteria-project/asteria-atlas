import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Atlas modules
import { BusinessModule } from './business-module/business.module';
import { GuiModule } from './gui-module/gui.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtlasContainerComponent } from './component/layout/atlas-container/atlas-container.component';
import { SplashScreenComponent } from './component/layout/splash-screen/splash-screen.component';
import { JobEditorComponent } from './component/jobs/job-editor/job-editor.component';
import { JobListComponent } from './component/jobs/job-list/job-list.component';
import { TemplateListComponent } from './component/templates/template-list/template-list.component';
import { EventListComponent } from './component/events/event-list/event-list.component';
import { TemplateDetailsComponent } from './component/templates/template-details/template-details.component';

const COMPONENTS: any[] = [
  AppComponent,
  // Main app views
  AtlasContainerComponent,
  SplashScreenComponent,
  EventListComponent,
  // Job views
  JobEditorComponent,
  JobListComponent,
  // Template views
  TemplateListComponent,
  TemplateDetailsComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BusinessModule,
    GuiModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
