import { Component, OnInit, Input } from '@angular/core';
import { Options } from './models/options.model';
import { DatatablesService } from './datatables.service';

@Component({
  selector: 'ng-datatable',
  template: `<router-outlet></router-outlet>`
})
export class DatatablesComponent implements OnInit {
  @Input('options') options: Options;

  constructor(private service: DatatablesService) {}

  ngOnInit(): void {
    this.service.init(this.options);
  }
}
