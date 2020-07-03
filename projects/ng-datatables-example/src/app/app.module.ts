import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgDatatablesModule } from 'ng-datatables';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgDatatablesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
