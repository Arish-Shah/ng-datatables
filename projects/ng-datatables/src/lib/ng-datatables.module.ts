import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { NgDatatablesComponent } from './ng-datatables.component';
import { TableComponent } from './components/table/table.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { Transform } from './pipes/transform.pipe';

const appRoutes: Routes = [
  { path: '', component: TableComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditComponent }
];

@NgModule({
  declarations: [
    NgDatatablesComponent,
    TableComponent,
    AddComponent,
    EditComponent,
    Transform
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    DataTablesModule
  ],
  exports: [NgDatatablesComponent]
})
export class NgDatatablesModule {}
