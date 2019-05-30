import { Component, Input } from '@angular/core';

/**
 * A component that displays the last update date of data displayed whithin an Atlas view.
 */
@Component({
  selector: 'update-date',
  templateUrl: './update-date.component.html'
})
export class UpdateDateComponent {

  /**
   * The date to be displayed by this component.
   */
  @Input() public dateTime: number = null;

  /**
   * Create a new <code>UpdateDateComponent</code> instance.
    */
  constructor() {}
}