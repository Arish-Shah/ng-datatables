import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Options } from './models/options.model';
import { DataService } from './services/data.service';

@Component({
  selector: 'ng-datatable',
  template: `<router-outlet></router-outlet>`
})
export class NgDatatablesComponent implements OnInit {
  @Input('options') options: Options;

  constructor(private service: DataService) {}

  ngOnInit(): void {
    this.service.init(this.options);
  }
}
