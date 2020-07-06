import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatatablesService } from './datatables.service';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Options } from './models/options.model';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './dialogs/add/add.component';
import { EditComponent } from './dialogs/edit/edit.component';
import { DeleteComponent } from './dialogs/delete/delete.component';

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
  tableColumns = [];
  popupColumns = [];
  crud;

  /* For adding and editing */
  newItem = {};

  constructor(private service: DatatablesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.init(this.options);
    this.dataSubscription = this.service.dataSubject.subscribe((data) => {
      this.dataSource.data = data;
    });
    this.tableColumns = this.service.tableColumns;
    this.popupColumns = this.service.popupColumns;
    this.crud = this.service.crud;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setNew();
  }

  getColumns() {
    const columns = this.tableColumns.map((column) => column.data);
    if (this.crud.update || this.crud.delete) columns.push('actions');
    return columns;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openAdd() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '600px',
      data: {
        popupColumns: this.popupColumns,
        newItem: this.newItem
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.service.create(result);
    });
  }

  openEdit(item) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '600px',
      data: {
        popupColumns: this.popupColumns,
        editingItem: { ...item }
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.service.update(result);
    });
  }

  openDelete(id) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: { id }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.service.delete(result);
    });
  }

  setNew() {
    this.popupColumns.forEach((column) => {
      this.newItem[column.data] = null;
    });
  }
}
