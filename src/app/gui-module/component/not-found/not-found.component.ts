import { Component, Injector } from '@angular/core';
import { AtlasViewComponent } from '../atlas-view/atlas-view.component';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: [ './not-found.component.scss' ]
})
export class NotFoundComponent extends AtlasViewComponent {
  
  /**
   * Create a new <code>NotFoundComponent</code> instance.
   * 
    * @param {Injector} injector the reference to the Angular services injector.
    */
   constructor(protected injector: Injector) {
    super(injector);
    this.breadcrumbService.setItems();
   }
}