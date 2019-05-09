import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenComponent } from './component/layout/splash-screen/splash-screen.component';
import { JobListComponent } from './component/jobs/job-list/job-list.component';
import { JobEditorComponent } from './component/jobs/job-editor/job-editor.component';
import { TemplateListComponent } from './component/templates/template-list/template-list.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/edit', component: JobEditorComponent },
  { path: 'templates', component: TemplateListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
