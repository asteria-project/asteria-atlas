import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileExplorerComponent } from './component/file-explorer/file-explorer.component';
import { FilePreviewComponent } from './component/file-preview/file-preview.component';
import { WorkspaceHomeComponent } from './component/workspace-home/workspace-home.component';

const routes: Routes = [
  { path: '', component: WorkspaceHomeComponent },
  { path: 'explorer', component: FileExplorerComponent },
  { path: 'preview', component: FilePreviewComponent },
  { path: 'preview/:filePath', component: FilePreviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
