import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { NgDatatablesComponent } from './ng-datatables.component';

@NgModule({
  declarations: [NgDatatablesComponent],
  imports: [BrowserModule, DataTablesModule, HttpClientModule],
  exports: [NgDatatablesComponent]
})
export class NgDatatablesModule {}
