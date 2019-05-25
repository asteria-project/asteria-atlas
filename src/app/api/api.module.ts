import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import { TemplateService } from './service/template/template.service';
import { ProcessConfigComponentResolver } from './service/process-config-component.resolver';
import { ProcessDefinitionService } from './service/config/process-definition.service';
import { BreadcrumbService } from './service/ui/breadcrumb.service';
import { NotificationService } from './service/ui/notification.service';

/**
 * The module that contains the business API of the Atlas application.
 */
@NgModule({
    imports: [
      CommonModule, 
      HttpClientModule
    ],
    exports: [
      CommonModule, 
      HttpClientModule
    ],
    declarations: [ ],
    providers: [
      { provide: BreadcrumbService, useClass: BreadcrumbService },
      { provide: NotificationService, useClass: NotificationService },
      { provide: ProcessDefinitionService, useClass: ProcessDefinitionService },
      { provide: ProcessConfigComponentResolver, useClass: ProcessConfigComponentResolver },
      { provide: TemplateService, useClass: TemplateService }
    ]
  })
  export class ApîModule { }