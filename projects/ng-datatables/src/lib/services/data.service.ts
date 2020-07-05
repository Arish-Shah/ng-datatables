import { Injectable } from '@angular/core';
import { Options } from '../models/options.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  options: Options;

  /* Main Data */
  data = [];
  dataSubject = new BehaviorSubject<any>([]);

  /* CRUD URLs */
  createURL: string;
  readURL: string;
  updateURL: string;
  deleteURL: string;
  crud = { create: false, read: true, update: false, delete: false };

  /* column details */
  columns = [];

  constructor(private http: HttpClient) {}

  init(options: Options) {
    this.options = options;
    this.columns = options.datatableOptions.columns;
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

  getData(id: string) {
    const index = this.data.findIndex((item) => item.id === id);
    return this.data[index];
  }

  create(obj: any) {
    if (this.crud.create) {
      // TODO: POST data (parse :id), get id back and push to data
      console.log('POST data');
      this.data.push({ id: this.data.length, ...obj });
      this.dataSubject.next(this.data.slice());
    }
  }

  read() {
    this.http
      .get(this.readURL)
      .subscribe((response: { status: string; data: any[] }) => {
        this.data = response.data;
        this.dataSubject.next(this.data.slice());
      });
  }

  update() {}

  delete(id: string) {
    if (this.crud.delete) {
      const index = this.data.findIndex((item) => item.id === id);
      this.data.splice(index, 1);
      this.dataSubject.next(this.data.slice());
    }
  }
}
