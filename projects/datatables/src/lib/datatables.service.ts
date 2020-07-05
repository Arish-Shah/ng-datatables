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

  /* Columns */
  columns = [];

  constructor(private http: HttpClient) {}

  init(options: Options) {
    this.options = options;
    this.columns = this.options.datatableOptions.columns;
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

  read() {
    this.http
      .get(this.readURL)
      .subscribe((response: { status: string; data: any[] }) => {
        this.data.next(response.data);
      });
  }
}
