import { Component, Input, OnInit } from '@angular/core';
import { Options } from './models/options.model';

@Component({
  selector: 'ng-datatable',
  template: `<router-outlet></router-outlet>`
})
export class NgDatatablesComponent implements OnInit {
  @Input('options') options: Options;

  constructor() {}

  ngOnInit(): void {}
}
