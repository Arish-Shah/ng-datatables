import { Injectable } from '@angular/core';
import { Options } from './models/options.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatatablesService {
  options: Options;

  /* Main Data */
  data = new BehaviorSubject([]);

  /* CRUD URLs with Options */
  createURL: string;
  readURL: string;
  updateURL: string;
  deleteURL: string;
  crud = { create: false, read: true, update: false, delete: false };

  /* id Key */
  id: string;

  /* Columns */
  tableColumns = [];
  popupColumns = [];

  constructor(private http: HttpClient) {}

  init(options: Options) {
    this.options = options;
    this.id = this.options.id || 'id';
    this.tableColumns = this.options.datatableOptions.columns;
    this.popupColumns = this.getPopupColumns();
    this.setURLs();
  }

  setURLs() {
    this.createURL = this.options.add
      ? this.options.baseAPIUrl + '/' + this.options.add
      : null;
    this.readURL = this.options.get
      ? this.options.baseAPIUrl + '/' + this.options.get
      : this.options.baseAPIUrl;
    this.updateURL = this.options.edit
      ? this.options.baseAPIUrl + '/' + this.options.edit
      : null;
    this.deleteURL = this.options.delete
      ? this.options.baseAPIUrl + '/' + this.options.delete
      : null;

    if (this.createURL) this.crud.create = true;
    if (this.readURL) this.crud.read = true;
    if (this.updateURL) this.crud.update = true;
    if (this.deleteURL) this.crud.delete = true;
    this.read();
  }

  firebase(response) {
    const data = [];
    Object.keys(response).forEach((item) => {
      data.push({ id: item, ...response[item] });
    });
    return data;
  }

  getPopupColumns() {
    const columns = [];
    this.tableColumns.forEach((column) => {
      if (column.data !== this.id) columns.push(column);
    });
    return columns;
  }

  read() {
    this.http.get(this.readURL).subscribe((response) => {
      // This function call only required for firebase
      const data = this.firebase(response);
      this.data.next(data);
    });
  }
}