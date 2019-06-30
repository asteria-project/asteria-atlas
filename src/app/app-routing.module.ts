import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenComponent, NotFoundComponent } from './gui-module';

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  {
    path: 'job',
    loadChildren: () => import('./job-module/job.module').then(m => m.JobModule)
  },
  {
    path: 'process',
    loadChildren: () => import('./process-module/process.module').then(m => m.ProcessModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit-module/edit.module').then(m => m.EditModule)
  },
  {
    path: 'workspace',
    loadChildren: () => import('./workspace-module/workspace.module').then(m => m.WorkspaceModule)
  },
  { path: '**',  component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
