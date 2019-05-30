import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GuiModule } from '../gui-module/gui.module';

// Services
import { TemplateService } from './service/template/template.service';
import { ProcessDefinitionService } from './service/config/process-definition.service';

/**
 * The module that contains the business API of the Atlas application.
 */
@NgModule({
    imports: [
      CommonModule, 
      HttpClientModule,
      GuiModule
    ],
    exports: [
      CommonModule, 
      HttpClientModule
    ],
    declarations: [ ],
    providers: [
      { provide: ProcessDefinitionService, useClass: ProcessDefinitionService },
      { provide: TemplateService, useClass: TemplateService }
    ]
  })
  export class BusinessModule { }