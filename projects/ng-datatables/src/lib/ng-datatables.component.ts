import { Component, OnInit, Input } from '@angular/core';
import { Options } from './models/options.model';
import { NgDatatablesService } from './ng-datatables.service';

@Component({
  selector: 'ng-datatable',
  templateUrl: './ng-datatables.component.html',
  styles: []
})
export class NgDatatablesComponent implements OnInit {
  @Input('options') options: Options;
  data = [];

  constructor(private service: NgDatatablesService) {}

  ngOnInit(): void {
    this.service.init(this.options);

    this.service.data.subscribe((data) => {
      this.data = data;
      console.log(data);
    });
  }

  onEdit(data) {
    console.log(data);
  }

  onDelete(id) {
    console.log(id);
  }
}
