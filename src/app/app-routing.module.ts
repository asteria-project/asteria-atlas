import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenComponent } from './component/layout/splash-screen/splash-screen.component';
import { JobListComponent } from './component/jobs/job-list/job-list.component';
import { JobEditorComponent } from './component/jobs/job-editor/job-editor.component';
import { TemplateListComponent } from './component/templates/template-list/template-list.component';
import { EventListComponent } from './component/events/event-list/event-list.component';
import { TemplateEditorComponent } from './component/templates/template-editor/template-editor.component';
import { TemplateDetailsComponent } from './component/templates/template-details/template-details.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'events', component: EventListComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/edit', component: JobEditorComponent },
  { path: 'templates', component: TemplateListComponent },
  { path: 'templates/:id', component: TemplateDetailsComponent },
  { path: 'edit/template', component: TemplateEditorComponent },
  { path: 'edit/template/:id', component: TemplateEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
