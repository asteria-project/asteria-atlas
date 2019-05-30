import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenComponent } from './component/layout/splash-screen/splash-screen.component';
import { JobListComponent } from './component/jobs/job-list/job-list.component';
import { JobEditorComponent } from './component/jobs/job-editor/job-editor.component';
import { EventListComponent } from './component/events/event-list/event-list.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'events', component: EventListComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/edit', component: JobEditorComponent },
  {
    path: 'processes',
    loadChildren: './process-module/process.module#ProcessModule'
  },
  {
    path: 'edit',
    loadChildren: './edit-module/edit.module#EditModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
