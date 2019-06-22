import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateListComponent } from './component/template-list/template-list.component';
import { TemplateDetailsComponent } from './component/template-details/template-details.component';
import { ProcessRunComponent } from './component/process-run/process-run.component';
import { ProcessHomeComponent } from './component/process-home/process-home.component';

const routes: Routes = [
  { path: '', component: ProcessHomeComponent },
  { path: 'templates', component: TemplateListComponent },
  { path: 'templates/:id', component: TemplateDetailsComponent },
  { path: 'templates/:id/run-process', component: ProcessRunComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }

