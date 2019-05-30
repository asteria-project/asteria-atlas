import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateEditorComponent } from './component/template-editor/template-editor.component';

const routes: Routes = [
  // error { path: '', component: SplashScreenComponent },
  { path: 'template', component: TemplateEditorComponent },
  { path: 'template/:id', component: TemplateEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
