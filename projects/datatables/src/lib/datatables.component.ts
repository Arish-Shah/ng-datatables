import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatatablesService } from './datatables.service';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Options } from './models/options.model';

@Component({
  selector: 'ng-datatable',
  templateUrl: 'datatables.component.html',
  styleUrls: ['./datatables.component.css']
})
export class DatatablesComponent implements OnInit {
  @Input('options') options: Options;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource();
  dataSubscription: Subscription;
  columns = [];
  crud;

  constructor(private service: DatatablesService) {}

  ngOnInit(): void {
    this.service.init(this.options);
    this.dataSubscription = this.service.data.subscribe((data) => {
      this.dataSource.data = data;
    });
    this.columns = this.service.columns;
    this.crud = this.service.crud;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getColumns() {
    const columns = this.columns.map((column) => column.data);
    if (this.crud.update || this.crud.delete) columns.push('actions');
    return columns;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onAdd() {
    console.log('adding');
  }

  onEdit(item) {
    console.log(item);
  }

  onDelete(id) {
    console.log(id);
  }
}
