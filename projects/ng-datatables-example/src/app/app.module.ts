import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgDatatablesModule } from 'ng-datatables';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgDatatablesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
