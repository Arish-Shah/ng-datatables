import { Component, OnInit, Input } from '@angular/core';
import { Options } from './models/options.model';

@Component({
  selector: 'ng-datatables',
  template: `
    <p>
      ng-datatables works!
    </p>
  `,
  styles: [],
})
export class NgDatatablesComponent implements OnInit {
  @Input('options') options: Options;

  constructor() {}

  ngOnInit(): void {
    console.log(this.options);
  }
}
