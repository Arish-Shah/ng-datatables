import { Injectable } from '@angular/core';
import { Options } from './models/options.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatatablesService {
  options: Options;

  /* Main Data */
  raw;
  data = [];
  dataSubject = new Subject();

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

  /* Function to convert firebase response to array */
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

  create(item) {
    if (this.createURL) {
      this.http.post(this.createURL, item).subscribe(
        (response) => {
          this.read();
          if (this.options.events.added) this.options.events.added(response);
        },
        (error) => this.errorCallback(error)
      );
    }
  }

  read() {
    this.http.get(this.readURL).subscribe(
      (response: any) => {
        this.raw = response;
        if (response.data) this.data = response.data;
        else this.data = this.firebase(response).reverse();
        this.dataSubject.next(this.data.slice());
      },
      (error) => this.errorCallback(error)
    );
  }

  update(updatedItem) {
    if (this.updateURL) {
      const url = this.updateURL.replace(`:${this.id}`, updatedItem[this.id]);
      this.http.put(url, updatedItem).subscribe((response) => {
        this.read();
        if (this.options.events.edited) this.options.events.edited(response);
      });
    }

    const index = this.data.findIndex(
      (data) => data[this.id] === updatedItem[this.id]
    );
    this.data[index] = updatedItem;
    this.dataSubject.next(this.data.slice());
  }

  delete(id) {
    if (this.deleteURL) {
      const url = this.deleteURL.replace(`:${this.id}`, id);
      this.http.delete(url).subscribe(
        () => {
          this.read();
          if (this.options.events.deleted) this.options.events.deleted();
        },
        (error) => console.log(error)
      );
    }
  }

  errorCallback(error) {
    if (this.options.events.error) {
      this.options.events.error(error);
    }
  }
}
