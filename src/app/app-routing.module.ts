import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenComponent, NotFoundComponent } from './gui-module';

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  {
    path: 'job',
    loadChildren: './job-module/job.module#JobModule'
  },
  {
    path: 'process',
    loadChildren: './process-module/process.module#ProcessModule'
  },
  {
    path: 'edit',
    loadChildren: './edit-module/edit.module#EditModule'
  },
  {
    path: 'workspace',
    loadChildren: './workspace-module/workspace.module#WorkspaceModule'
  },
  { path: '**',  component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
