import { Component, Injector } from '@angular/core';
import { AtlasViewComponent } from '../atlas-view/atlas-view.component';

@Component({
  selector: 'splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: [ './splash-screen.component.scss' ]
})
export class SplashScreenComponent extends AtlasViewComponent {
  
  /**
   * Create a new <code>SplashScreenComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
   constructor(protected injector: Injector) {
    super(injector);
    this.breadcrumbService.setItems();
   }
}