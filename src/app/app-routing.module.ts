import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashScreenComponent } from './layout/component/splash-screen/splash-screen.component';
import { NotFoundComponent } from './layout/component/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  {
    path: 'jobs',
    loadChildren: './job-module/job.module#JobModule'
  },
  {
    path: 'processes',
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
