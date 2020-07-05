import { Injectable } from '@angular/core';
import { Options } from '../models/options.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {}

  init(options: Options) {
    console.log(options);
  }
}
