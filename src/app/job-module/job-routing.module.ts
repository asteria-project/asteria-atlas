import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './component/job-list/job-list.component';
import { JobHomeComponent } from './component/job-home/job-home.component';

const routes: Routes = [
  { path: '', component: JobHomeComponent },
  { path: 'jobs', component: JobListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
