import { Component, OnInit } from '@angular/core';
import { Options } from 'ng-datatables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options: Options;

  constructor() {}

  ngOnInit(): void {
    this.options = {
      baseAPIUrl: 'foo',
    };
  }
}
