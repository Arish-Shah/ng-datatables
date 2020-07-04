import { Injectable, OnInit } from '@angular/core';
import { Options } from './models/options.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgDatatablesService {
  options: Options;

  /* CRUD URLs */
  getURL: string;
  editURL: string;
  addURL: string;
  deleteURL: string;

  /* data object containing the response data */
  data = new Subject<any>();

  constructor(private http: HttpClient) {}

  init(options: Options) {
    this.options = options;
    this.setURL();
    this.read();
  }

  setURL() {
    this.getURL = this.options.get
      ? this.options.baseAPIUrl + '/' + this.options.get
      : this.options.baseAPIUrl;
    this.addURL = this.options.get
      ? this.options.baseAPIUrl + '/' + this.options.add
      : null;
    this.editURL = this.options.edit
      ? this.options.baseAPIUrl + '/' + this.options.edit
      : null;
    this.deleteURL = this.options.delete
      ? this.options.baseAPIUrl + '/' + this.options.delete
      : null;
  }

  create() {}

  read() {
    this.http.get(this.getURL).subscribe((response: any) => {
      this.data.next(response.data);
    });
  }

  update() {}

  del() {}
}
