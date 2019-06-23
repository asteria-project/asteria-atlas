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
import { AtlasContainerComponent } from './layout/component/atlas-container/atlas-container.component';
import { SplashScreenComponent } from './layout/component/splash-screen/splash-screen.component';
import { NotFoundComponent } from './layout/component/not-found/not-found.component';
import { ClipboardComponent } from './layout/component/clipboard/clipboard.component';

const COMPONENTS: any[] = [
  AppComponent,
  // Main app views
  AtlasContainerComponent,
  ClipboardComponent,
  SplashScreenComponent,
  NotFoundComponent
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
